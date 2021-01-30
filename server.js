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
      } else if (response === "Add employee") {
        addEmployee();
      } else if (response === "Update employee manager") {
        updateManager();
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
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: ["Sales Manager", "Logistics Manager", "Sales Associate", "Logistics Associate"],
            name: "role"
        },
        {
            type: "list",
            message: "Whos is the employees manager?",
            choices: ["Brian Smith", "Sally Smith", "Rebecca Nickleson", "Lawrence Davidson"],
            name: "manager"
        }
    ]).then(function(rez) {
        var roleId;
        var managerId;

        console.log("Adding employee...");
        if (rez.manager === "Brian Smith") {
            managerId = 1;
        } else if(rez.manager === "Sally Smith") {
            managerId = 2;
        } else if(rez.manager === "Rebecca Nickleson") {
            managerId = 5;
        }  else if(rez.manager === "Lawrence Davidson") {
            managerId = 6;
        };


        if (rez.role === "Sales Manager") {
            roleId = 5;
        } else if(rez.role === "Logistics Manager") {
            roleId = 6;
        } else if(rez.role === "Sales Associate") {
            roleId = 7;
        }  else if(rez.role === "Logistics Associate") {
            roleId = 8;
        }
        var query = connection.query("INSERT INTO employee SET ?",
        {
            first_name: rez.first,
            last_name: rez.last,
            role_id: roleId,
            manager_id: managerId
        }, function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + "employee inserted");
            initiateApp();
        })
    })
}

// Delete Employee
function deleteEmployee() {

}

// Update calls
function updateRole() {

}

function updateManager() {
    var managerId; 
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Id of the employee you wish to update?",
            name: "id"
        },
        {
            type: "list",
            message: "Whos is the employees new manager?",
            choices: ["Brian Smith", "Sally Smith", "Rebecca Nickleson", "Lawrence Davidson"],
            name: "manager"
        }
    ]).then(function(result) {
        if (result.manager === "Brian Smith") {
            managerId = 1;
        } else if(result.manager === "Sally Smith") {
            managerId = 2;
        } else if(result.manager === "Rebecca Nickleson") {
            managerId = 5;
        }  else if(result.manager === "Lawrence Davidson") {
            managerId = 6;
        };

        var query = connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                manager_id: managerId
            },
            {
                id: result.id
            }
        ],
        function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + " employee updated");
            initiateApp();
        })

    })
}

}
