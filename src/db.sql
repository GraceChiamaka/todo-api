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

CREATE TABLE tasks(
    task_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL, 
    description TEXT,
    completed BOOLEAN NOT NULL 
);
SELECT * FROM tasks;

INSERT INTO tasks (user_id, title, description, completed) VALUES('213a8876-1f7b-4329-b5db-e6e67d571221', 'Go grocery shopping', 'Restock for the next 2 weeks', false);



-- psql -U postgres
-- \c tododb
-- \dt
-- heroku pg:psql 