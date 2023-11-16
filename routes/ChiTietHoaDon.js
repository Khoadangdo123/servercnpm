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

	db.query(updateChiTietDonHang, updatedData, (err, results) => {
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

router.delete('/chitiethoadon', (req, res) => {
	const { MAHD, MASP } = req.body;

	console.log({ MAHD, MASP })

	db.query(setForeignCTHD_0, (err, results) => {
		db.query(deleteChiTietDonHang, [ MAHD, MASP ], (err, results) => {
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

// router.post('/chitiethoadonadd',(req, res) => {

// 	const { MAHD, MAKH, NVXUAT, NGAYXUAT, TRANGTHAI } = req.body;

// 	const insertData = [
// 		MAHD,
// 		MAKH,
// 		NVXUAT,
// 		NGAYXUAT,
// 		TRANGTHAI
// 	];

// 	db.query(insertChiTietDonHang, insertData, (err, results, fields) => {
// 		if (err) {
// 			res.status(400).json('Error executing query:', err);
// 			return;
// 		}

// 		res.status(200).json({
// 			data: results
// 		});
// 	})
// });

module.exports = router;