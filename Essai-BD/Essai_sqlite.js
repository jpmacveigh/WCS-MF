#!/usr/bin/env node
const sqlite3 = require('sqlite3').verbose();
var nomDB="test.sqlite"
var db = new sqlite3.Database(nomDB,(err) => {
  if (err){
    console.error(err.message);
  }
  console.log('Connected to ',nomDB,' database.');
});
//create table "persons" in the database
db.run("CREATE TABLE IF NOT EXISTS persons(id integer primary key, firstname text, lastname text)",function(err){
    if (err){
      console.log("erreur creation table : ",err.message);
      return;
    }
    console.log("création de la table OK ");
});

//insert one row into the "persons" table
var prenom="Alain";
var nom="Porte";
//db.run("INSERT INTO persons(firstname,lastname) VALUES ('Jean Pierre','Mac Veigh')", function(err) {
db.run(`INSERT INTO persons(firstname,lastname) VALUES(?,?)`,prenom,nom, function(err) {
    if (err) {
      console.log("erreur insertion dans la table : ",err.message);
      return;
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});
db.each("SELECT firstname,lastname FROM persons", (err, row) => {  // lire toutes les lignes de la table "persons"
  if (err) {
    throw err;
  }
  console.log(`${row.firstname} ${row.lastname}`);
});
 
// close the database connection
db.close();
