#!/usr/bin/env python3
"""Fallback transport for Sol Consult: one temporary, visible handoff folder.

The primary transport is the official Codex built-in browser. Use this helper only when
browser transport is unavailable or blocked.

No network calls. No ChatGPT automation. It only copies explicitly selected files,
writes a mechanical SHA-256 manifest, and can use macOS pbcopy/open for convenience.
"""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path
import shutil
import subprocess
import tempfile

SENSITIVE_PARTS = {
    ".env", ".env.local", ".env.production", "id_rsa", "id_ed25519",
    "credentials", "credential", "secrets", "secret", "private_key",
    "access_token", "refresh_token",
}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def reject_sensitive(path: Path) -> None:
    lowered = {part.lower() for part in path.parts}
    name = path.name.lower()
    if lowered & SENSITIVE_PARTS or any(token in name for token in SENSITIVE_PARTS):
        raise SystemExit(f"Refusing potentially sensitive attachment: {path}")


def unique_destination(base: Path, preferred: Path) -> Path:
    dest = base / preferred
    if not dest.exists():
        return dest
    stem, suffix = dest.stem, dest.suffix
    i = 2
    while True:
        candidate = dest.with_name(f"{stem}-{i}{suffix}")
        if not candidate.exists():
            return candidate
        i += 1


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--repo", required=True, help="Repository root")
    p.add_argument("--prompt", required=True, help="Prepared consultation prompt markdown")
    p.add_argument("--file", action="append", default=[], help="Attachment path; repeat as needed")
    p.add_argument("--label", default="consult", help="Short decision label")
    p.add_argument("--clipboard", action="store_true", help="Copy PROMPT.md text to macOS clipboard")
    p.add_argument("--reveal", action="store_true", help="Reveal the prepared folder in Finder on macOS")
    args = p.parse_args()

    repo = Path(args.repo).expanduser().resolve()
    prompt = Path(args.prompt).expanduser().resolve()
    if not repo.is_dir():
        raise SystemExit(f"Repository is not a directory: {repo}")
    if not prompt.is_file():
        raise SystemExit(f"Prompt is not a file: {prompt}")

    safe_label = "".join(c if c.isalnum() or c in "-_" else "-" for c in args.label).strip("-") or "consult"
    bundle = Path(tempfile.mkdtemp(prefix=f"sol-consult-{safe_label}-"))

    prompt_dest = bundle / "PROMPT.md"
    shutil.copy2(prompt, prompt_dest)
    files_root = bundle / "files"
    files_root.mkdir()

    manifest_lines = [f"repo\t{repo}", f"prompt\t{prompt}\t{sha256(prompt)}"]
    seen = set()
    for raw in args.file:
        source = Path(raw).expanduser().resolve()
        if source in seen:
            continue
        seen.add(source)
        if not source.is_file():
            raise SystemExit(f"Attachment is not a regular file: {source}")
        reject_sensitive(source)
        try:
            rel = source.relative_to(repo)
            preferred = rel
        except ValueError:
            preferred = Path(source.name)
        dest = unique_destination(files_root, preferred)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, dest)
        manifest_lines.append(f"file\t{source}\t{dest.relative_to(bundle)}\t{source.stat().st_size}\t{sha256(source)}")

    (bundle / "MANIFEST.txt").write_text("\n".join(manifest_lines) + "\n")

    if args.clipboard and shutil.which("pbcopy"):
        subprocess.run(["pbcopy"], input=prompt_dest.read_bytes(), check=True)
    if args.reveal and shutil.which("open"):
        subprocess.run(["open", "-R", str(prompt_dest)], check=False)

    print(bundle)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
