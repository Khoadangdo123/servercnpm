const express = require('express');
const router = express.Router();
const {
	tableKH
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/khachhang', (req, res) => {
	db.query(tableKH, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

module.exports = router;