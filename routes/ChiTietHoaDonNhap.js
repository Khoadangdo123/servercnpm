const express = require('express');
const router = express.Router();
	
const {
	tableChiTietHoaDonNhap,
	updateChiTietHoaDonNhap,
	insertChiTietHoaDonNhap,
	deleteChiTietHoaDonNhap,
	setForeignCTHD_0
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.post('/chitiethoadonnhap',(req, res) => {

	const { MAHD } = req.body; 

	db.query(tableChiTietHoaDonNhap, [ MAHD ], (err, results, fields) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});


router.patch('/chitiethoadonnhap', (req, res) => {
	const {
		MAHD,
		MASP,
		DONGIA,
		SOLUONG,
	} = req.body;

	const updatedData = [
		MASP,
		DONGIA,
		SOLUONG,
		MAHD,
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

		db.query(updateChiTietHoaDonNhap, updatedData, (err, results) => {
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

router.delete('/chitiethoadonnhap', (req, res) => {
	const { MAHD, MASP, SOLUONG } = req.body;
	if (Number(SOLUONG) > 0) {
		res.json({
			error: 1,
			message: 'Sản phẩm còn không thế xóa'
		})
	} else {
		db.query(deleteChiTietHoaDonNhap, [ MAHD, MASP ], (err, results) => {
			if (err) {
				res.status(400).json({
					error: 2,
					message: err.message
				});
				return;
			} else {
				res.json({
					message: 'Xóa dữ liệu thành công',
					data: results,
					status: 'success'
				});
				return;
			}
	
		});
	}

});

router.post('/chitiethoadonnhapadd',(req, res) => {

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
			db.query(insertChiTietHoaDonNhap, insertData, (err, results, fields) => {
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