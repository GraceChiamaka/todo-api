CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE tododb;
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

SELECT * FROM users;
INSERT INTO users(user_name, email, password) VALUES('Jane', 'jane@mailinator.com', 'password');
INSERT INTO users(user_name, email, password) VALUES('John', 'johnny@mailinator.com', 'Johnny123');

-- psql -U postgres
-- \c tododb
-- \dt
-- heroku pg:sql 