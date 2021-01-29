var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id: " + connection.threadId);
  initiateApp();
});

function initiateApp() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Remove employee", "Update employee Role", "Update employee manager", "View all roles", "View all departments"],
            name: "initial_choice"
        }
    ]).then(function(res) {
        var response = res.initial_choice;
        if(response === "View all employees") {
            displayAllEmployees();
        }
    });

    function displayAllEmployees() {
        connection.query("SELECT * FROM employee", function(err,res) {
            if(err) throw err;
            console.table(res);
            initiateApp();
        })
    }
}
