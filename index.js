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

function addDepartment(){

    inquirer.prompt({
        type: "input",
        message: "Enter the desired department:",
        name: "newDep"
    })
    .then((data) => {

        connection.query
        ("INSERT INTO department (name) VALUES (?)",
        [data.newDep],
        function (err, result) {
            if (err) throw err;
        })


    })
}