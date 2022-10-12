-- CREATE DATABASE police_app;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    passwordHash VARCHAR(255),
    adminAccess BOOLEAN
);

CREATE TABLE peopleOnBail(
    user_id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    offense VARCHAR(255),
    longitude VARCHAR(255),
    latitude VARCHAR(255),
    photoLink VARCHAR(255),
    groupMember VARCHAR(255),
    isActive BOOLEAN
);

CREATE TABLE bailChecks(
    check_id SERIAL PRIMARY KEY,
    officerID BIGINT references users(user_id),
    personOnBailID BIGINT,
    checkTime BIGINT,
    personPresent BOOLEAN
);
