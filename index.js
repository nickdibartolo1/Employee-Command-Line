const inquire = require('inquirer')
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
