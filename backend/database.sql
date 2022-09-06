-- CREATE DATABASE police_app;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    passwordHash VARCHAR(255)
);