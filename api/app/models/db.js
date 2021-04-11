const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//Create a connection to the database
const connection = mysql.createConnection({
	host:	dbConfig.HOST,
	user:	dbConfig.USER,
	password:	dbConfig.PASSWORD,
	database:	dbConfig.DB,
	port: dbConfig.PORT
});

//Open the MySQL connection using const var defined above
connection.connect(error => {
	if (error) throw error;
	console.log("DB.JS: MySQL Database has Connected!")
});

module.exports = connection;