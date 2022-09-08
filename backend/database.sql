-- CREATE DATABASE police_app;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    passwordHash VARCHAR(255)
);

CREATE TABLE peopleOnBail(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    offense VARCHAR(255),
    longitude VARCHAR(255),
    latitude VARCHAR(255),
    linkToPhoto VARCHAR(255)
);

CREATE TABLE bailChecks(
    check_id SERIAL PRIMARY KEY,
    officerName VARCHAR(255) references users(user_id),
    personOnBailName VARCHAR(255) references peopleOnBail(user_id),
    checkTime BIGINT,
    personPresent BOOLEAN,
    comments VARCHAR(255)
);
