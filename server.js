var mysql = require("mysql");
var inquirer = require("inquirer");
const { connect } = require("http2");

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
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add employee",
          "Remove employee",
          "Update employee Role",
          "Update employee manager",
          "View all roles",
          "View all departments",
        ],
        name: "initial_choice",
      },
    ])
    .then(function (res) {
      var response = res.initial_choice;
      if (response === "View all employees") {
        displayAllEmployees();
      } else if (response === "View all roles") {
        displayAllRoles();
      } else if (response === "View all departments") {
        displayAllDepartments();
      } else if (response === "View all employees by department") {
        byDepartment();
      } else if (response === "View all employees by manager") {
        byManager();
      }
    });

  // View All calls

  function displayAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      initiateApp();
    });
  }

  function displayAllRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      console.table(res);
      initiateApp();
    });
  }

  function displayAllDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
      initiateApp();
    });
  }

  // View By calls

  function byDepartment() {
    var dept;
    inquirer
      .prompt([
        {
          type: "list",
          message: "What Department?",
          choices: ["HR", "Executive", "Management", "Associate"],
          name: "department",
        },
      ])
      .then(function (response) {
        if (response.department === "HR") {
          dept = 1;
        } else if (response.department === "Executive") {
          dept = 2;
        } else if (response.department === "Management") {
          dept = 3;
        } else if (response.department === "Associate") {
          dept = 4;
        };

        connection.query(
          "SELECT employee.first_name, employee.last_name, role.title, department.name AS department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id WHERE department.id = " + dept, function(err,res) {
              if(err) throw err;
              console.table(res);
              initiateApp();
          }
        );
      });
  }

  function byManager() {
      var manager;
      inquirer.prompt([
          {
              type: "list",
              message: "Whos employees would you like to view?",
              choices: ["Brian Smith", "Sally Smith", "Rebecca Nickleson", "Lawrence Davidson"],
              name: "manager"
          }
      ]).then(function(r) {
          if(r.manager === "Brian Smith") {
              manager = 1;
          } else if(r.manager === "Sally Smith") {
              manager = 2;
          } else if(r.manager === "Rebecca Nickleson") {
            manager = 5;
        } else if(r.manager === "Lawrence Davidson") {
            manager = 6;
        };
        
        connection.query(
            "SELECT employee.first_name, employee.last_name, e.first_name AS manager FROM employee INNER JOIN employee AS e on employee.manager_id = e.id WHERE e.id = " + manager, function(err,res) {
                if(err) throw err;
                console.table(res);
                initiateApp();
            }
          );
      })
  }

// Add employee
function addEmployee() {

}

// Delete Employee
function deleteEmployee() {

}

// Update calls
function updateRole() {

}

function updateManager() {
    
}

}
