const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "1_tcs",
    multipleStatements: true
});

con.connect(function (err) {
    if (err) throw err;
});



module.exports = con;