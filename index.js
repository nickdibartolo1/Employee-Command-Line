const inquirer = require('inquirer');
const mysql = require('mysql2')
require('dotenv').config();


const connection = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.USER,
        password: process.env.PASSWORD,
        db: process.env.DATABASE
    },
    console.log("Ready to go!")
)


function homeMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "Choose what you would like to do",
                choices: [
                    "Add department",
                    "Add role",
                    "Add employee",
                    "View departments",
                    "View roles",
                    "View employees",
                    "Update employee role",
                    "Exit"
                ],
            },
        ])
        .then(({ option }) => {
            switch (option) {
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
                    addRole();
                    break;
                default:
                    exit();
            }
        });
}

//All switch statement functions
//addDepartment function

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
                    })
        })
}

//addRole function
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
                message: "What department is the new role?",
                name: "roleDepId"
            }

        ])
        .then((data) => {
            connection.query("INSERT INTO role (title, salary, department_id VALUES (?, ?, ?)",
                [data.nameOfRole, data.roleSalary, data.roleDepId],
                function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    homeMenu();
                })
        })
}

//addEmployee function
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
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
            [data.empFirstName, data.empLastName, empRoleId, empManagerId],
                function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    homeMenu();
                })

        })
}