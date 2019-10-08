
DROP DATABASE IF EXISTS preschool;

CREATE DATABASE preschool;

use kozfqzwj8xkl6ccg;

CREATE TABLE  Classes (classId VARCHAR(255), studentId INTEGER, createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL, PRIMARY KEY (classId)) ;

CREATE TABLE Activities 
(id INTEGER AUTO_INCREMENT NOT NULL, activityDate DATE NOT NULL , activityName VARCHAR(255) NOT NULL, activityTime TIME NOT NULL, description VARCHAR(255) NOT NULL, classId VARCHAR(255), createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL, PRIMARY KEY (id, activityDate)) ;

 CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `email` VARCHAR(255), `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `accessLevel` VARCHAR(255) DEFAULT '1', `password` VARCHAR(255) NOT NULL, `googleId` VARCHAR(255), `studentId` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ;
 CREATE TABLE  Students (id INTEGER NOT NULL auto_increment , firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, parent1FirstName VARCHAR(255) NOT NULL, parent1LastName VARCHAR(255) NOT NULL, parent2FirstName VARCHAR(255), parent2LastName VARCHAR(255), studentPhoto VARCHAR(255), classId VARCHAR(255), createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL, studentId VARCHAR(255), PRIMARY KEY (id), FOREIGN KEY (classId) REFERENCES Classes (classId) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (studentId) REFERENCES Classes (classId) ON DELETE SET NULL ON UPDATE CASCADE) ;
 
insert into Students (firstName,lastName,parent1FirstName, parent1LastName,parent2FirstName, parent2LastName,studentPhoto,classId,createdAt,updatedAt)
values ("Sweet","Coder","Lisa","Coder","Mike","Coder","uploads\images\sweet.jpg","001","20190927","20190927");
 
 insert into classes (classId,studentId,createdAt,updatedAt) values("001",1,"20190927","20190927");
insert into Users (email,firstName,lastName,accessLevel,password,
googleId,studentId,createdAt,updatedAt) values("teacher1@school.com","Danie","Last","0","$2a$10$lShjFW/8cZCs5mSxoDLek.8ba8FacBrP5uo6oIIG1ZQBGCGpvDqVy","none",0,"20190927","20190927");