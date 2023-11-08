const express = require('express');
const router = express.Router();
const {
	tableDataDD,
	setForeignDD_0,
	setForeignDD_1,
	insertDataDD,
	deleteDD,
	updateDD
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/dondat', (req, res) => {
	db.query(tableDataDD, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/dondat', (req, res) => {

	const { MADD, NVDAT, NGDAT } = req.body;
	const newData = [
		MADD,
		NVDAT,
		NGDAT
	];

	db.query(setForeignDD_0, (err, results) => {
		db.query(insertDataDD, newData, (err, results, fields) => {
			if (err) {
				res.status(400).json(err.message);
				return;
			}

			db.query(setForeignDD_1, (err, results) => {
				res.status(200).json({
					message: 'Thêm dữ liệu thành công',
					data: results
				});
			})
		});
	})
});

router.delete('/dondat', (req, res) => {
	const { MADD } = req.body;

	db.query(deleteDD, [ MADD ], (err, results) => {
		if (err) {
			res.status(400).json(err.message);
			return;
		}

		res.json({
			message: 'Xóa dữ liệu thành công',
			data: results
		});
	});
});

router.patch('/dondat', (req, res) => {
	const { 
		NVDAT,
		NGDAT,
		MADD
	} = req.body;

	db.query(updateDD, [ NVDAT, NGDAT, MADD ], (err, results) => {
		if (err) {
			res.status(400).json(err.message);
			return;
		}

		res.json({
			message: 'Cập nhật dữ liệu thành công',
			data: results
		});
	});
})


module.exports = router;