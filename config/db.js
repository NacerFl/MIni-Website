const mysql = require("mysql");




var datab = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb"  });
  
	datab.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		datab.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
		  if (err) throw err;
		  console.log("Database created");
		});
	
	
		var sql = "CREATE TABLE IF NOT EXISTS mydb.User (iduser INT AUTO_INCREMENT  PRIMARY KEY , nom VARCHAR(255) NOT null, email VARCHAR(255) NOT null, mdp varchar(255) NOT null)";
		datab.query(sql, function (err, result) {
		  if (err) throw err;
		  console.log("Table USER created");
		});

		var sql = "CREATE TABLE IF NOT EXISTS mydb.Memo (idmemo INT AUTO_INCREMENT PRIMARY KEY , memo TEXT NOT null, id_memo INT)"
		datab.query(sql,function (err,result) {
			if (err) throw err;
			console.log("Table MEMO created");
		});


		var sql = "CREATE TABLE IF NOT EXISTS mydb.Partage (idmemo INT, auteur INT , idtext INT NOT null)"
		datab.query(sql,function (err,result) {
			if (err) throw err;
			console.log("Table PARTAGE created");
		});

	});
      
 module.exports = datab;  