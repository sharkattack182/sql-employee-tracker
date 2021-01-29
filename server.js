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
    "SELECT * FROM employee",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    }
  );
}
