var mysql = require("mysql");

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
  afterConnection();
});

function afterConnection() {
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, title, salary, d.name, em.first_name, em.last_name FROM employee as e INNER JOIN role ON e.role_id = role.id INNER JOIN employee as em ON e.manager_id = em.id LEFT JOIN department AS d ON d.id = role.department_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    }
  );
}
