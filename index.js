const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require('dotenv').config();

// connection config //

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
   // console.log("Ready to go!")
);
// we make the connecion to the Database
connection.connect(function(err) {
    if(err) throw err;
    console.log("Database Connected");
})


function homeMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "Choose what you would like to do",
                choices: [
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Update Employee Role",
                    "Exit"
                ],
            },

        ])
        .then((option) => {
            console.log(option.choices);
            switch (option.choices) {
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Exit":
                    exit();
                    break;
                default:
                    exit();
            }
        });
}

// All switch statement functions //
// function viewDepartments //

function viewDepartments() {
    console.log("in VIEW DEPARTMENTS LOGIC")
    // query the DB
    connection.query('SELECT name FROM department;', function(err, data) {
        if(err) {
            console.log(err);
            throw err;
        }
        // if Success
        console.log(data);

        console.table(data);
        // go back to our list
        homeMenu();
    });

}

// function viewRoles //

function viewRoles() {
    console.log("in VIEW ROLES LOGIC")
    // query the DB
    connection.query('SELECT title, salary, department_id FROM role;', function(err, data) {
        if(err) {
            console.log(err);
            throw err;
        }
        // if Success
        console.log(data);

        console.table(data);
        // go back to our list
        homeMenu();
    });

}

// function viewEmployees //

function viewEmployees() {
    console.log("in VIEW EMPLOYEES LOGIC")
    // query the DB
    connection.query('SELECT first_name, last_name, role_id, manager_id FROM employee;', function(err, data) {
        if(err) {
            console.log(err);
            throw err;
        }
        // if Success
        console.log(data);

        console.table(data);
        // go back to our list
        homeMenu();
    });

}


// addDepartment function //

function addDepartment() {

    inquirer.prompt([
        {
            type: "input",
            message: "Enter the desired department:",
            name: "newDep"
        }
    ])
        .then((data) => {

            connection.query
                ("INSERT INTO department (name) VALUES (?)",
                    [data.newDep],
                    function (err, result) {
                        if (err) throw err;
                        console.table(result);
                        homeMenu();
                    })
        })
}

// addRole function //

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the new desired role?",
                name: "nameOfRole"
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "What department ID# is the new role?",
                name: "roleDepId"
            }

        ])
        .then((data) => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                [data.nameOfRole, data.roleSalary, Number(data.roleDepId)],
                function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    homeMenu();
                })
        })
}

// addEmployee function //

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name of the new employee?",
                name: "empFirstName"
            },
            {
                type: "input",
                message: "What is the last name of the new employee?",
                name: "empLastName"
            },
            {
                type: "input",
                message: "What is the new employee's role ID number",
                name: "empRoleId"
            },
            {
                type: "input",
                message: "What is the new employee's manager ID number",
                name: "empManagerId"
            },
        ])
        .then((data) => {
            console.log(data)
            console.log(data.empFirstName, data.empLastName, Number(data.empRoleId), Number(data.empManagerId))
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [data.empFirstName, data.empLastName, Number(data.empRoleId), Number(data.empManagerId)],
                function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    homeMenu();
                })

        })
}



function updateRole(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Which employee's role would you like to update?",
            name: "empRoleUpdate"
        },
        {
            type: "input",
            message: "What role do you want to update this employee too?",
            name: "roleUpdate"
        },
    ])
    .then ((data) => {
        connection.query('UPDATE employee SET role_id=? WHERE first_name =?',
        [data.empRoleUpdate, data.roleUpdate],
        function (err, result) {
            if (err) throw err;
            console.table(result);
            homeMenu();
        })

    })
}


// exit function //

function exit() {
    console.log("You are exiting the program!!");
}

homeMenu();