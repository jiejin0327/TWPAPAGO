ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '880327';
flush privileges;

SET @@global.sql_mode = ``; /*  error for data too long for column */ 

DROP database `twpapago`;
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
    eng TEXT,
    level INT,
    web TEXT,
    content TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (viewPointId) REFERENCES viewPoints(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS reading_activity (
    id INT AUTO_INCREMENT,
    user_id INT,
    passage_id INT,
    read_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (passage_id) REFERENCES passages(id)
);

describe viewPoints;
select * from viewPoints;
select * from passages;
select * from variables;

UPDATE viewPoints 
JOIN (SELECT id FROM viewPoints WHERE name='九份 Jiufen') AS tmp
ON viewPoints.id = tmp.id
SET 
	imageUrl='https://th.bing.com/th/id/R.514d189b92ef18a02897be4cb8cfce6e?rik=1oGNix3jG%2bjZOg&riu=http%3a%2f%2ftrippedia100.com%2fwp-content%2fuploads%2f2016%2f09%2f%e4%b9%9d%e4%bb%bd-1.jpg&ehk=pwpnADFDApiN0lje4PEG1dx0iO4tiXHVyJFxIazEFXc%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
	photoUrl='https://www.google.com.tw/search?sca_esv=558956162&q=%E4%B9%9D%E4%BB%BD&tbm=isch&source=lnms&sa=X&ved=2ahUKEwion5ahmO-AAxWgmlYBHTtgB3wQ0pQJegQIDBAB&biw=1385&bih=691&dpr=2';

drop table `viewPoints`;
drop table `passages`;
drop table `variables`;