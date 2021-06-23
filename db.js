const mysql = require('mysql');
const con = mysql.createConnection({
    host: "theleadpanda.com",
    user: "a210507t_root",
    password: "cashless@2021",
    database: "a210507t_lms",
    multipleStatements: true
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;