
DROP DATABASE IF EXISTS preschool;

CREATE DATABASE preschool;

-- insert into users (id,email,firstName,lastName,accessLevel,user_password,
-- googleId,studentId) values("1","teacher1@school.com","Danie","Last","0","111111","none","all");

insert into students (firstName,lastName,parent1FirstName, parent1LastName,parent2FirstName, parent2LastName,classId,createdAt,updatedAt)
values ("Sweet","Coder","Lisa","Coder","Mike","Coder","0001","20190927","20190927");