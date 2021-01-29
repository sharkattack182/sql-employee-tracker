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
-- Departments
INSERT INTO department (name)
VALUES ("HR");
INSERT INTO department (name)
VALUES ("Executive");
INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Associate");

-- Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Hiring Manager", 35000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 33000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 55000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("CFO", 55000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 45000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Logistics Manager", 45000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 35000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Logistics Associate", 35000, 4);

-- Executives
INSERT INTO employee (first_name, last_name, role_id)    -- 1
VALUES ("Brian", "Smith", 3);
INSERT INTO employee (first_name, last_name, role_id)   -- 2
VALUES ("Sally", "Smith", 4);

-- HR and Management
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 3
VALUES ("Gary", "Wilson", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 4
VALUES ("Linda", "Thompson", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 5
VALUES ("Rebecca", "Nickleson", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 6
VALUES ("Lawrence", "Davidson", 6, 1);

-- Sales Associates
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 7 
VALUES ("Chris", "Smith", 7, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 8
VALUES ("David", "Anderson", 7, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 9
VALUES ("Amy", "Reynolds", 7, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 10
VALUES ("Susan", "Collins", 7, 5);

-- Logistics Associates
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 11
VALUES ("Randy", "Green", 8, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 12
VALUES ("Joe", "Harkins", 8, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 13
VALUES ("Steve", "Croft", 8, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)   -- 14
VALUES ("Nelson", "Brands", 8, 6);

-- Updates
-- Roles
UPDATE employee
SET role_id = 5
WHERE id = 11;

-- Managers
UPDATE employee
SET manager_id = 7
WHERE id = 11;


-- Filter Features
-- By Manager
SELECT (role_id, first_name, last_name) 
FROM employee
WHERE manager_id = 5;

-- View All Data for employees
SELECT e.id, e.first_name, e.last_name, title, salary, d.name, em.first_name, em.last_name
FROM employee as e
INNER JOIN role ON e.role_id = role.id
INNER JOIN employee as em
ON e.manager_id = em.id
LEFT JOIN department AS d
ON d.id = role.department_id;


-- Deleting Methods
DELETE FROM employee
WHERE id = 11;

DELETE FROM role
WHERE id = 7;

DELETE FROM department
WHERE id = 5;

-- Select all 
SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
