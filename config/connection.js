var mysql = require("mysql2");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "feed_it_forward"
  });
}
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;