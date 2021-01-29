DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE DATABASE employee_db;

-- Creating Tables
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);


CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);


-- Creating the data 
INSERT INTO department (name)
VALUES ("HR");
INSERT INTO department (name)
VALUES ("Executive");
INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Associate");


INSERT INTO role (title, salary, department_id)
VALUES ("Hiring Manager", 35.000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 33.000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 55.000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("CFO", 55.000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 45.000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Logistics Manager", 45.000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 35.000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Logistics Associate", 35.000, 4);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Brian", "Smith", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sally", "Smith", 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Wilson", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Linda", "Thompson", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rebecca", "Nickleson", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lawrence", "Davidson", 6, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Smith", 7, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Anderson", 7, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "Reynolds", 7, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Susan", "Collins", 7, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Randy", "Green", 8, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Harkins", 8, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Croft", 8, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nelson", "Brands", 8, 6);




SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
