CREATE DATABASE movies_app;
USE movies_app;

CREATE USER 'user1'@'localhost' IDENTIFIED BY '1234abc';
GRANT ALL PRIVILEGES ON *.* TO 'user1'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE movies(
	id_movie INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(250),
    m_year VARCHAR(10),
    imbdID VARCHAR(20),
    m_type VARCHAR(10),
    poster TEXT,
    PRIMARY KEY(id_movie)
);

CREATE TABLE comments(
	id_comment INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    m_comment TEXT,
    id_movie INTEGER UNSIGNED,
    PRIMARY KEY(id_comment),
    FOREIGN KEY(id_movie)
	  REFERENCES movies(id_movie)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

DROP TABLE movies;
DROP TABLE comments;

SELECT * FROM movies;
SELECT * FROM comments;

SELECT imbdID FROM movies WHERE imbdID = 1;

SELECT
    id_movie AS 'Movie ID',
    title AS 'Title',
    m_year AS 'Year',
    imbdID ,
    m_type AS 'Type',
    poster AS 'Poster'
    FROM movies ORDER BY 7 ASC;
