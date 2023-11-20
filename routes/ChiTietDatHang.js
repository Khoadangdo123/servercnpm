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

	if (DONGIA === '' || SOLUONG === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Cần bạn nhập đầy đủ thông tin',
			}
		);
		return;
	} else {
		db.query(updateDonDat, updatedData, (err, results) => {

			if (Number(SOLUONG) < 0 || Number(DONGIA) < 0) {
				res.json(
					401,
					{
						error: 2,
						message: 'Cần phải nhập là số nguyên dương'
					}
				)
			} else {
				if (err) {
					res.status(400).json(err.message);
					return;
				}
		
				res.status(200).json({
					message: 'Cập nhật dữ liệu thành công',
					data: results,
					status: 'success'
				});
			}
		});
	}

	
});

router.delete('/chitietdathang', (req, res) => {
	const { MADD, MASP } = req.body;

	db.query(setForeignCTHD_0, (err, results) => {
		db.query(deleteDonDat, [ MADD, MASP ], (err, results) => {
			if (err) {
				res.status(400).json({
					error: 1,
					message: err.message
				});
				return;
			}
	
			res.json({
				message: 'Xóa dữ liệu thành công',
				data: results,
				status: 'delete success'
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

	if (MADD === '' || MASP === '' || SOLUONG === '' || DONGIA === '') {
		res.json(
			400,
			{
				error: 1,
				message: 'Bạn nhập đầy đủ thông tin'
			}
		)
	} else {
		db.query(insertDonDat, insertData, (err, results, fields) => {

			if (Number(SOLUONG) < 0 || Number(DONGIA) < 0) {
				res.json(
					400,
					{
						error: 1,
						message: 'Bạn cần nhập số dương'
					}
				)
			} else {
				if (err) {
					res.status(400).json(
						{
							error: 2,
							message: err.message
						}
					);
					return;
				}
		
				res.status(200).json({
					message: 'Bạn đã cập nhật thành công',
					data: results,
					status: 'success'
				});
			}

		})

	}

});

module.exports = router;