#!/usr/bin/env python3
"""Back up the tutor database while it runs, so students never lose their progress.

Uses SQLite's online backup (safe with the tutor writing at the same time), checks each
copy with PRAGMA integrity_check, and keeps the newest copies in every destination:

  backup_db.py --db data/tutor.db --dest /mnt/ssd/backups:72:1 --dest ~/cloud/backups:60:24

A destination is DIR:KEEP:EVERY_HOURS. It is skipped (with a message) when its newest copy
is younger than EVERY_HOURS or the directory's volume is not mounted. Exit status is 1 only
when every destination that was due failed. Python 3.9+ standard library only.
"""
from __future__ import annotations

import argparse
import os
import sqlite3
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

PREFIX = "tutor-"


def parse_dest(spec: str) -> tuple[Path, int, float]:
    parts = spec.rsplit(":", 2)
    if len(parts) != 3:
        raise argparse.ArgumentTypeError(f"use DIR:KEEP:EVERY_HOURS, got {spec!r}")
    return Path(os.path.expanduser(parts[0])), int(parts[1]), float(parts[2])


def copies(d: Path) -> list[Path]:
    return sorted(p for p in d.glob(PREFIX + "*.db") if p.is_file())


def backup_to(db: Path, d: Path, keep: int, every_hours: float, now: float) -> str:
    if len(d.parts) > 2 and d.parts[1] == "Volumes" and not Path("/Volumes", d.parts[2]).is_mount():
        return f"skip {d}: volume not mounted"
    d.mkdir(parents=True, exist_ok=True)
    have = copies(d)
    if have and now - have[-1].stat().st_mtime < every_hours * 3600 - 60:
        return f"skip {d}: newest copy is recent"
    stamp = datetime.fromtimestamp(now, timezone.utc).strftime("%Y%m%d-%H%M%S")
    out = d / f"{PREFIX}{stamp}.db"
    tmp = out.with_suffix(".tmp")
    src = sqlite3.connect(f"file:{db}?mode=ro", uri=True, timeout=30)
    dst = sqlite3.connect(tmp)
    try:
        src.backup(dst)
    finally:
        src.close()
    dst.execute("PRAGMA journal_mode=DELETE")  # a single self-contained file, no -wal/-shm beside it
    ok = dst.execute("PRAGMA integrity_check").fetchone()[0] == "ok"
    dst.close()
    for side in (tmp.with_name(tmp.name + "-wal"), tmp.with_name(tmp.name + "-shm")):
        side.unlink(missing_ok=True)
    if not ok:
        tmp.unlink(missing_ok=True)
        raise RuntimeError(f"integrity check failed for the copy in {d}")
    os.chmod(tmp, 0o600)
    tmp.replace(out)
    for old in copies(d)[:-keep]:
        old.unlink()
    return f"ok {out}"


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--db", type=Path, required=True)
    ap.add_argument("--dest", type=parse_dest, action="append", required=True)
    a = ap.parse_args(argv)
    if not a.db.exists():
        print(f"{a.db} does not exist", file=sys.stderr)
        return 1
    now, due, failed = time.time(), 0, 0
    for d, keep, every in a.dest:
        try:
            msg = backup_to(a.db, d, max(keep, 1), every, now)
            due += not msg.startswith("skip")
        except Exception as e:  # noqa: BLE001 - one destination failing must not stop the others
            due += 1
            failed += 1
            msg = f"FAILED {d}: {e}"
        print(f"{datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')} {msg}", flush=True)
    return 1 if due and failed == due else 0


if __name__ == "__main__":
    sys.exit(main())
