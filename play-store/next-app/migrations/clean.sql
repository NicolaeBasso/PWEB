DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS apps;

CREATE TABLE roles (
   id          INTEGER PRIMARY KEY,
   role        TEXT NOT NULL UNIQUE
);

INSERT INTO roles (id, role)
VALUES
    (1, 'publisher'),
    (2, 'user'),
    (3, 'none');

CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT,
  email         TEXT,
  password      TEXT,
  role          INTEGER NOT NULL default 3,
  constraint fk_roles foreign key (role) references roles (id)
);

INSERT INTO users (name, email, password, role)
VALUES
    ('Jake Publisher', 'jp@gmail.com', '4321', 'publisher'),
    ('Paul User', 'pu@gmail.com', '1234', 'publisher'),
    ('Bob Stranger', 'bs@gmail.com', '1111', 'publisher');

CREATE TABLE games (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT,
  genre         TEXT,
  description   TEXT,
  creator     TEXT
);

CREATE TABLE apps (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT,
  genre         TEXT,
  description   TEXT,
  creator     TEXT
);