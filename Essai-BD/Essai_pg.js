#!/usr/bin/env node
console.log ("Essai Postgres");
var pg = require("pg");
var conString = "pg://ubuntu:@localhost:5432/Employees";
//var conString = "pg://ubuntu:@node_jpmv-jpmv.c9users.io:5432/Employees";
//http://<workspacename>-<username>.c9users.io:8082
var client = new pg.Client(conString);
//console.log(client);
//client.connect();
var connection = client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});
console.log("connection : ",connection);
//client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
//client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
//client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");

query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});

