-- Insert sample departments
INSERT INTO department (name) 
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Human Resources');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Manager', 50000, 1),
       ('Software Engineer', 80000, 2),
       ('Accountant', 60000, 3),
       ('HR Manager', 70000, 4);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Michael', 'Doe', 1, NULL),
       ('Anthony', 'Smith', 2, 1),
       ('karen', 'Johnson', 3, 1),
       ('Anna', 'Williams', 4, NULL);