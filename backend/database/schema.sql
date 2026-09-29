-- ============================================================
-- GarissaConnect — SQLite3 Schema
-- ============================================================

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    description TEXT,
    icon        TEXT,
    created_at  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT    NOT NULL,
    description    TEXT,
    category_id    INTEGER NOT NULL,
    provider_name  TEXT,
    phone          TEXT,
    email          TEXT,
    location       TEXT,
    image          TEXT,
    is_verified    INTEGER NOT NULL DEFAULT 0 CHECK (is_verified IN (0, 1)),
    is_active      INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_at     TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_active   ON services(is_active);
