DROP DATABASE IF EXISTS homeyhelp_db;
CREATE DATABASE homeyhelp_db;

CREATE TABLE homies(
    id INT AUTO_INCREMENT NOT NULL,
    user VARCHAR(16) NOT NULL,
    password_hash BINARY(40) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone INT(10) NOT NULL,
    bio VARCHAR(255) NOT NULL,
    hobbies VARCHAR(255),
    age INT NOT NULL,
    gender VARCHAR(255) NOT NULL,
    budget INT NOT NULL,
    finance_score INT NOT NULL,
    clean_score INT NOT NULL,
    personality_type varchar(4) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    employed BOOLEAN default false,
    city VARCHAR(255) NOT NULL,
    zip_code INT(5) NOT NULL,
    PRIMARY KEY(user)
);
