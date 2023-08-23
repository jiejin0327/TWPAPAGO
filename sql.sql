ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '880327';
flush privileges;

SET @@global.sql_mode = ``; /*  error for data too long for column */ 

DROP database `taiwanpapago`;
CREATE DATABASE IF NOT EXISTS taiwanpapago;


show databases;

USE taiwanpapago;

CREATE TABLE IF NOT EXISTS viewPoints (
    id INT AUTO_INCREMENT,
    name VARCHAR(255),
    imageUrl VARCHAR(1000),
    photoUrl VARCHAR(1000),
    map VARCHAR(1000),
    web VARCHAR(1000),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS passages (
    id INT AUTO_INCREMENT,
    viewPointId INT,
    idx INT,
    eng VARCHAR(1000),
    level INT,
    web VARCHAR(1000),
    contents VARCHAR(1000),
    words VARCHAR(1000),
    PRIMARY KEY (id)
);

describe viewPoints;
select * from viewPoints;
select * from passages;

drop table `viewPoints`;
drop table `passages`;