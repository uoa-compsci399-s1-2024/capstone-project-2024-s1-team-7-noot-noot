CREATE DATABASE sightsaver_db;

USE sightsaver_db;

/* Create the users table */
CREATE TABLE users (
	user_id int PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    parent boolean NOT NULL
);

/* Add test data into user table */
INSERT INTO users VALUES ( 1, 'Admin', 'Password', 'admin@gmail.com', true);

/* Query user table */
SELECT * FROM users;

/* Create the feedback table */
CREATE TABLE feedback (
	feedback_id int PRIMARY KEY,
    comment varchar(255) NOT NULL
);

/* Add test data into user table */
INSERT INTO feedback VALUES ( 1, 'This is a test of the feedback comment');

/* Query feedback table */
SELECT * FROM feedback;

/* Create the parents table */
CREATE TABLE parents (
	parent_id int PRIMARY KEY, 
    parents_name varchar(255), 
    uv_goal float DEFAULT 2,
    number_of_children int DEFAULT 0,
    feedback_id int,
    user_id int NOT NULL,
    FOREIGN KEY (feedback_id) REFERENCES feedback(feedback_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* Add test data into parent table */
INSERT INTO parents  VALUES ( 1, 'parent_test_name', 5.0, 2, 1, 1 ); 

/* Query parents table */
SELECT * FROM parents;

/* Create the uv table */
CREATE TABLE uv (
    uv_id int PRIMARY KEY, 
    uv_value float,
    uv_date datetime
);

/* Add test data into float table */
INSERT INTO uv VALUES ( 1, 4.8, '2024-04-21 13:58:22');

/* Query uv table */
SELECT * FROM uv;

/* Create the lux table */
CREATE TABLE lux (
    lux_id int PRIMARY KEY, 
    lux_value float,
    lux_date datetime
);

/* Add test data into lux table */
INSERT INTO lux VALUES ( 1, 30264.0, '2024-04-21 13:58:22');

/* Query lux table */
SELECT * FROM lux;

/* Create the sensors table */
CREATE TABLE sensors (
    sensor_id int PRIMARY KEY, 
    user_id int NOT NULL,
    lux_id int,
    uv_id int ,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (lux_id) REFERENCES lux(lux_id),
    FOREIGN KEY (uv_id) REFERENCES uv(uv_id)
);

/* Add test data into sensors table */
INSERT INTO sensors VALUES ( 1, 1, 1, 1);

/* Query sensors table */
SELECT * FROM sensors;

/* Create the child table */
CREATE TABLE child (
	child_id int PRIMARY KEY, 
    childs_name varchar(255), 
    sensor_id int NOT NULL, 
	parent_id int NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES sensors(sensor_id),
    FOREIGN KEY (parent_id) REFERENCES parents(parent_id)
);

/* Add test data into child table */
INSERT INTO child VALUES ( 1, 'child_test_name', 1, 1 );

/* Query child table */
SELECT * FROM child;

/* Create the researchers table */
CREATE TABLE researchers (
    researcher_id int PRIMARY KEY, 
    researcher_name varchar(255) NOT NULL, 
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* Add test data into researcher table */
INSERT INTO researchers  VALUES ( 1, 'researcher_test_name', 1 );

/* Query researchers table */
SELECT * FROM researchers;
