const express = require('express');
const router = express.Router();
	
const {
	tableDonDat,
	insertDonDat,
	updateDonDat,
	deleteDonDat,
	setForeignCTHD_0,
	setForeignCTHD_1
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.post('/chitietdondatTQ',(req, res) => {

	const { MADD } = req.body;

	db.query(tableDonDat, [ MADD ], (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});


router.patch('/chitietdathang', (req, res) => {
	const {
		MADD,
		MASP,
		DONGIA,
		SOLUONG,
	} = req.body;

	const updatedData = [
		SOLUONG,
		DONGIA,
		MADD,
		MASP,
	];

	db.query(updateDonDat, updatedData, (err, results) => {
		if (err) {
			res.status(400).json(err.message);
			return;
		}

		res.json({
			message: 'Cập nhật dữ liệu thành công',
			data: results,
			status: 'success'
		});
	});
});

router.delete('/chitietdathang', (req, res) => {
	const { MADD, MASP } = req.body;

	db.query(setForeignCTHD_0, (err, results) => {
		db.query(deleteDonDat, [ MADD, MASP ], (err, results) => {
			if (err) {
				res.status(400).json(err.message);
				return;
			}
	
			res.json({
				message: 'Xóa dữ liệu thành công',
				data: results,
				status: 'success'
			});
		});
	});
});

router.post('/chitietdathang',(req, res) => {

	const {
		MADD,
		MASP,
		SOLUONG,
		DONGIA
	} = req.body;

	const insertData = [
		MADD,
		MASP,
		SOLUONG,
		DONGIA,
	];

	db.query(insertDonDat, insertData, (err, results, fields) => {
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