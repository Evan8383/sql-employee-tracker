INSERT INTO
    department (name) VALUE ('Customer Service'),
    ('Accounting'),
    ('Sales'),
    ('Development');

INSERT INTO
    role (title, salary, department_id) VALUE 
    ('Level 1 Tech', 50000, 1),
    ('Level 2 Tech', 65000, 1),
    ('Accountant', 80000, 2),
    ('Account Manager', 95000, 2),
    ('Sales Consultant', 75000, 3),
    ('Sales Director', 150000, 3),
    ('FrontEnd Engineer', 85000, 4),
    ('BackEnd Engineer', 95000, 4),
    ('Project Manager', 150000, 4);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id) VALUE 
    ('Archie', 'Atkins', 4, NULL),
    ('Edie', 'Harmon', 6, NULL),
    ('Harmony', 'Snow', 9, NULL),
    ('Sean', 'Jenkins', 1, 3),
    ('Isaac', 'Padilla', 2, 3),
    ('Peggy', 'Potts', 3, 1),
    ('Bruce', 'Combs', 5, 2),
    ('Jakob', 'Faulkner', 7, 3),
    ('Roseanna', 'Dickson', 8, 3),
    ('Larissa', 'Fleming', 8, 3);