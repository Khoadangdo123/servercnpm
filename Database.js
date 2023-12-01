const mysql = require('mysql2');


const db = mysql.createConnection({
	host: '127.0.0.1',
	port: '3306',
	user: 'root',
	password: '160203',
	database: 'qlchthucannhanh'
});

db.connect((err) => {
	if (err) {
		throw err;
	}

	console.log('Connected to MySQL database');
});

module.exports = db;