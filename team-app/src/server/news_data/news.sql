Drop DATABASE IF EXISTS news;
CREATE DATABASE news
COLLATE utf8mb4_unicode_ci;
use news;
CREATE TABLE News (
    id INTEGER AUTO_INCREMENT,
    news_title varchar(99),
    news_content varchar(5000),
    PRIMARY KEY (id)
);
CREATE TABLE comments (
	id INTEGER AUTO_INCREMENT,
    news_id INTEGER,
	label INTEGER,
    comments_content varchar(200),
	PRIMARY KEY (id),
    FOREIGN KEY (news_id) REFERENCES news (id)
);