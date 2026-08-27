#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ACTION="${1:-status}"
failed=0

case "$ACTION" in
  status|apply|pull) ;;
  *) echo "usage: ./sync.sh [status|apply|pull]" >&2; exit 2 ;;
esac

roots=(
  "live/codex|$HOME/.codex"
  "live/opencode|$HOME/.config/opencode"
  "live/claude|$HOME/.claude"
  "live/dsh|${DSH_HOME:-$HOME/.dsh}"
  "live/pi|$HOME/.pi/agent"
  "live/omp|$HOME/.omp/agent"
  "live/command-code|$HOME/.commandcode"
)

has_symlink_component() {
  local path="$1"
  local parent

  while :; do
    [[ -L "$path" ]] && return 0
    parent="$(dirname "$path")"
    [[ "$parent" == "$path" ]] && return 1
    path="$parent"
  done
}

for mapping in "${roots[@]}"; do
  src_rel="${mapping%%|*}"
  dst_root="${mapping#*|}"
  src_root="$ROOT/$src_rel"
  [[ -d "$src_root" ]] || continue

  if [[ "$dst_root" != /* ]]; then
    printf 'REFUSE   non-absolute destination root: %s\n' "$dst_root" >&2
    failed=1
    continue
  fi

  while IFS= read -r -d '' src; do
    rel="${src#$src_root/}"
    repo_rel="$src_rel/$rel"
    dst="$dst_root/$rel"

    if has_symlink_component "$dst"; then
      printf 'REFUSE   symlink destination: %s\n' "$dst" >&2
      failed=1
      continue
    fi

    case "$ACTION" in
      status)
        if [[ ! -f "$dst" ]]; then
          printf 'MISSING  %s -> %s\n' "$repo_rel" "$dst"
        elif cmp -s "$src" "$dst"; then
          printf 'OK       %s\n' "$repo_rel"
        else
          printf 'DRIFT    %s <-> %s\n' "$repo_rel" "$dst"
        fi
        ;;
      apply)
        mkdir -p "$(dirname "$dst")"
        cp "$src" "$dst"
        printf 'APPLIED  %s -> %s\n' "$repo_rel" "$dst"
        ;;
      pull)
        if [[ -f "$dst" ]]; then
          cp "$dst" "$src"
          printf 'PULLED   %s <- %s\n' "$repo_rel" "$dst"
        else
          printf 'SKIP     missing %s\n' "$dst"
        fi
        ;;
    esac
  done < <(find "$src_root" -type f -print0 | sort -z)
done

if (( failed != 0 )); then
  exit 1
fi
