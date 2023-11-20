const express = require('express');
const router = express.Router();
	
const {
	tableChiTietDonHang,
	updateChiTietDonHang,
	insertChiTietDonHang,
	deleteChiTietDonHang,
	setForeignCTHD_0
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.post('/chitiethoadon',(req, res) => {

	const { MAHD } = req.body; 

	db.query(tableChiTietDonHang, [ MAHD ], (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});


router.patch('/chitiethoadon', (req, res) => {
	const {
		MAHD,
		MASP,
		DONGIA,
		SOLUONG,
	} = req.body;

	const updatedData = [
		DONGIA,
		SOLUONG,
		MAHD,
		MASP,
	];

	if (MASP === '' || SOLUONG === '' || DONGIA === '') {
		res.json(
			401,
			{
				message: 'Bạn cần nhập đủ thông tin',
				error: 1
			}
		);
		return;
	} else {

		db.query(updateChiTietDonHang, updatedData, (err, results) => {
			if (Number(SOLUONG) < 0 || Number(DONGIA) < 0) {
				res.status(200).json(
					{
						message: 'Bạn cần phải nhập số dương',
						error: 2
					}
				);
				return;
			} else {
				if (err) {
					res.status(400).json({
						error: 3,
						message: err.message
					});
					return;
				} else {

					res.json({
						message: 'Cập nhật dữ liệu thành công',
						data: results,
						status: 'success'
					});
					return;
				}
			}
		});
	}

});

router.delete('/chitiethoadon', (req, res) => {
	const { MAHD, MASP } = req.body;

	db.query(setForeignCTHD_0, (err, results) => {
		db.query(deleteChiTietDonHang, [ MAHD, MASP ], (err, results) => {
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
				status: 'success'
			});
		});
	});
});

router.post('/chitiethoadonadd',(req, res) => {

	const {
		MAHD,
		MASP,
		DONGIA,
		SOLUONG,
	} = req.body;

	const insertData = [
		MAHD,
		MASP,
		DONGIA,
		SOLUONG,
	];

	if (MAHD === '' || MASP === '' || DONGIA === '' || SOLUONG === '') {

		res.json(
			200,
			{
				error: 1,
				message: 'Bạn cần nhập đủ thông tin'
			}
		);
		return;

	} else {

		if (Number(DONGIA) < 0 || Number(SOLUONG) < 0) {
			res.json(
				200,
				{
					error: 2,
					message: 'Bạn cần nhập thông tin số dương'
				}
			);
			return;

		} else {
			db.query(insertChiTietDonHang, insertData, (err, results, fields) => {
				if (err) {
					res.status(400).json({
						error: 3,
						message: err.message
					});
					return;
				} else {

					res.status(200).json({
						message: 'Success Full Updated',
						data: results,
						status: 'success'
					});
					return;

				}
		
			});
		}
	}

});

module.exports = router;