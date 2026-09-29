"""
GarissaConnect — SQLite3 Database Helper
=========================================

Every Flask route uses these functions to talk to SQLite.
Having them in one place means:
  - Foreign keys are always enabled
  - Rows always come back as dictionaries (JSON-friendly)
  - Connections are always closed
  - The database path is set once

Usage in a Flask route:

    from db import fetch_all, fetch_one, execute_write

    rows = fetch_all("SELECT * FROM services WHERE is_active = 1")
    row  = fetch_one("SELECT * FROM services WHERE id = ?", (service_id,))
    new_id = execute_write("INSERT INTO services (name) VALUES (?)", ("Test",))
"""

import sqlite3
from pathlib import Path

# ============================================================
# Database path — resolved relative to this file
# ============================================================
DB_PATH = Path(__file__).parent / "database" / "garissaconnect.db"


# ============================================================
# Connection management
# ============================================================

def get_db_connection():
    """
    Open a connection to the SQLite database.

    - `row_factory = sqlite3.Row` makes each row behave like a dict,
      so we can do row["name"] instead of row[1].
    - `PRAGMA foreign_keys = ON` is REQUIRED on every connection;
      SQLite disables foreign key checks by default.
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


def close_db_connection(conn):
    """Close the connection. Safe to call on None."""
    if conn is not None:
        conn.close()


# ============================================================
# Query helpers
# ============================================================

def _row_to_dict(row):
    """Convert a sqlite3.Row to a plain dict (JSON-serializable)."""
    return dict(row) if row is not None else None


def fetch_all(sql, params=()):
    """
    Run a SELECT and return every row as a list of dicts.

    Always use parameterized queries:
        fetch_all("SELECT * FROM services WHERE category_id = ?", (cat_id,))
    Never:
        fetch_all(f"SELECT * FROM services WHERE category_id = {cat_id}")
    """
    conn = get_db_connection()
    try:
        cur = conn.execute(sql, params)
        rows = cur.fetchall()
        return [_row_to_dict(r) for r in rows]
    finally:
        close_db_connection(conn)


def fetch_one(sql, params=()):
    """Run a SELECT and return a single row as a dict (or None)."""
    conn = get_db_connection()
    try:
        cur = conn.execute(sql, params)
        row = cur.fetchone()
        return _row_to_dict(row)
    finally:
        close_db_connection(conn)


def execute_write(sql, params=()):
    """
    Run an INSERT / UPDATE / DELETE.

    Returns the id of the last inserted row, or None for updates/deletes.
    Commits automatically.
    """
    conn = get_db_connection()
    try:
        cur = conn.execute(sql, params)
        conn.commit()
        return cur.lastrowid
    except sqlite3.Error:
        conn.rollback()
        raise
    finally:
        close_db_connection(conn)
