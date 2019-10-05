
DROP DATABASE IF EXISTS preschool;

CREATE DATABASE preschool;

insert into users (email,firstName,lastName,accessLevel,password,
googleId,studentId,createdAt,updatedAt) values("teacher1@school.com","Danie","Last","0","$2a$10$lShjFW/8cZCs5mSxoDLek.8ba8FacBrP5uo6oIIG1ZQBGCGpvDqVy","none",0,"20190927","20190927");

insert into students (firstName,lastName,parent1FirstName, parent1LastName,parent2FirstName, parent2LastName,classId,createdAt,updatedAt)
values ("Sweet","Coder","Lisa","Coder","Mike","Coder","0001","20190927","20190927");