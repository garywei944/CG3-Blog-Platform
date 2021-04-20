
-- create tables

CREATE TABLE user_account (
    username VARCHAR(20), 
    pwd VARCHAR(20),
    profile_pic TEXT,
    bio VARCHAR(250),
    PRIMARY KEY(username)
);

CREATE TABLE post (
    post_id serial  primary key,
    username VARCHAR(20),
    title VARCHAR(50),
    content TEXT,
    post_time TIMESTAMP,
    FOREIGN KEY(username) REFERENCES user_account(username) 
);

CREATE TABLE liked (
    username VARCHAR(20),
    post_id serial,
    FOREIGN KEY(username) REFERENCES user_account(username),
    FOREIGN KEY(post_id) REFERENCES post(post_id)
);

CREATE TABLE follow (
    username VARCHAR(20),
    follower_name VARCHAR(20),
    FOREIGN KEY(username) REFERENCES user_account(username),
    FOREIGN KEY(follower_name) REFERENCES user_account(username)
);

-- populate tables with data

INSERT INTO user_account values 
    ('Alex', 123, 'fake_url1', 'hello I am Alex'),
    ('Chris', 456, 'fake_url2', 'hello I am Chris'),
    ('Devin', 789, 'fake_url3', 'hello I am Devin');

INSERT INTO post (username, title, content) values 
    ('Alex', 'post alex', 'story alex'),
    ('Alex', 'post alex 2', 'story alex 2'),
    ('Chris', 'post Chris', 'story Chris');

--INSERT INTO liked values
-- ('Alex', 'post Chris'),
-- ('Chris', 'post alex');

INSERT INTO liked values
 ('Alex', 3),
 ('Chris', 1);

INSERT INTO follow values ('Alex', 'Chris'),
    ('Chris', 'Alex'),
    ('Alex', 'Devin');

-- debug: modify column type
-- ALTER TABLE follow ALTER COLUMN follower_name TYPE VARCHAR(20);

-- add post_id
--ALTER TABLE post ADD post_id VARCHAR(20);
--INSERT INTO post (post_id) values ('Alex', 'post alex', 'story alex');

--UPDATE post SET post_id = '01' WHERE title = 'post alex';
--UPDATE post SET post_id = '02' WHERE title = 'post alex 2';
--UPDATE post SET post_id = '03' WHERE title = 'post Chris';

-- dropping primary key attempt: didn't actually do it
-- ALTER TABLE post DROP CONSTRAINT post_pkey;

---- adding three posts
--INSERT INTO post (username, title, content, post_id) values
--    ('Chris', 'post Chris 2', 'story Chris 2', '04'),
--    ('Devin', 'post Devin', 'story Devin', '05'),
--    ('Devin', 'post Devin 2', 'story Devin 2', '06');

-- adding three posts
INSERT INTO post (username, title, content) values
    ('Chris', 'post Chris 2', 'story Chris 2'),
    ('Devin', 'post Devin', 'story Devin'),
    ('Devin', 'post Devin 2', 'story Devin 2');
