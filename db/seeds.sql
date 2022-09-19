INSERT INTO
    department (name)
VALUES
    ("Marketing"),
    ("Sales"),
    ("Finance"),
    ("Human Resources")


INSERT INTO
    role (title, salary, department_id)
VALUES
    ("Brand Manager", 90000, 1),
    ("Social Media Manager", 44000, 1), 
    ("Creative Director", 77000, 1), 
    ("Retail Sales Associate", 30000, 2), 
    ("Accountant", 80000, 3) ("Budget analyst", 82000, 3), 
    ("Payroll Manager", 74000, 3), 
    ("Tech Support Specialist", 57300, 4), 
    ("Customer Service Associate", 30000, 4);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
    ("Anthony", "Barcci", 1, 1),
    ("Christopher", "David", 2, 2),
    ("Erin", "Falastaff", 3, 3),
    ("Gregory", "Hanson", 4, NULL),
    ("Iris", "Jackson", 4, NULL),
    ("Kylie", "Lyles", 4, NULL),
    ("Monty", "Noosum", 5, NULL),
    ("Olivia", "Peters", 6, 6),
    ("Quincy", "Robinson", 7, NULL),
    ("Sarah", "Trinity", 8, NULL),
    ("Uman", "Vahala", 8, NULL);
