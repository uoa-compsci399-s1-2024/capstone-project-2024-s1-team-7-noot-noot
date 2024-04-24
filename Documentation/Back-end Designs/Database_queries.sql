CREATE DATABASE sightsaver_db;

USE sightsaver_db;

/* Create the users table */
CREATE TABLE [user] (
	id int PRIMARY KEY IDENTITY(1,1),
	email varchar(255) UNIQUE NOT NULL,
	parent bit NOT NULL,
	username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);

/* Add test data into user table */
INSERT INTO [user] VALUES ('admin@gmail.com', 1, 'Admin', 'Password');

/* Query user table */
SELECT * FROM [user];

/* Create the feedback table */
CREATE TABLE feedback(
	id int PRIMARY KEY IDENTITY(1,1),
    comment varchar(255) NOT NULL
);

/* Add test data into user table */
INSERT INTO feedback VALUES ('This is a test of the feedback comment');

/* Query feedback table */
SELECT * FROM feedback;

/* Create the parents table */
CREATE TABLE parent (
	id int PRIMARY KEY IDENTITY(1,1), 
    feedback_id int,
    name varchar(255), 
    number_of_children int DEFAULT 0,
    uv_goal float DEFAULT 2
);

/* Add test data into parent table */
INSERT INTO parent VALUES (1, 'parent_test_name', 2, 5 ); 

/* Query parents table */
SELECT * FROM parent;

/* Create the uv table */
CREATE TABLE uv (
    id int PRIMARY KEY IDENTITY(1,1), 
    date_time datetime,
	uv_value float
);

/* Add test data into float table */
INSERT INTO uv VALUES ( '2024-04-21 13:58:22', 4.8);

/* Query uv table */
SELECT * FROM uv;

/* Create the lux table */
CREATE TABLE lux (
    id int PRIMARY KEY IDENTITY(1,1), 
    date_time datetime,
    lux_value float
);

/* Add test data into lux table */
INSERT INTO lux VALUES ('2024-04-21 13:58:22', 30264.0);

/* Query lux table */
SELECT * FROM lux;

/* Create the sensors table */
CREATE TABLE sensor (
    id int PRIMARY KEY IDENTITY(1,1), 
	lux_id int,
    user_id int NOT NULL,
    uv_id int
);

/* Add test data into sensors table */
INSERT INTO sensor VALUES (1, 1, 1);

/* Query sensors table */
SELECT * FROM sensor;

/* Create the child table */
CREATE TABLE child (
	id int PRIMARY KEY IDENTITY(1,1), 
    name varchar(255), 
	parent_id int NOT NULL,
    sensor_id int NOT NULL
);

/* Add test data into child table */
INSERT INTO child VALUES ('child_test_name', 1, 1 );

/* Query child table */
SELECT * FROM child;

/* Create the researchers table */
CREATE TABLE researcher (
    id int PRIMARY KEY IDENTITY(1,1), 
    name varchar(255) NOT NULL
);

/* Add test data into researcher table */
INSERT INTO researcher  VALUES ('researcher_test_name');

/* Query researchers table */
SELECT * FROM researcher;
