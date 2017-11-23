var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:8080/mydb";

//var url = "mongodb://0.0.0.0:8080/mydb";
var url = "mongodb://node_jpmv.jpmv.c9.io/mydb";
//https://workspaceName-username.c9.io:3000

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});