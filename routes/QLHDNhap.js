const express = require('express');
const router = express.Router();

const {
	tableHDNhap,
	insertHDNhap,
	updateHDNhap,
	deleteHDNhap,
	setForeignHDNhap_0
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/hoadonnhap', (req, res) => {
	db.query(tableHDNhap, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/hoadonnhap', (req, res) => {

	const { MAHD,NVXUAT,NGNHAP,TONG } = req.body;
	const newData = [
		MAHD,
		NVXUAT,
		NGNHAP,
		TONG,
	];

	db.query(insertHDNhap, newData, (err, results) => {
		if (err) {
			res.status(400).json({
				error: err.message,
				data: "oke"
			});
			return;
		}

		res.status(200).json({
			message: 'Thêm data cơ sở dữ liệu',
			data: results
		})
	});

	// db.query(setForeignHDNhap_0, (err, results) => {
	// 	db.query(insertHDNhap, newData, (err, results) => {
	// 		if (err) {
	// 			res.status(400).json({
	// 				error: err.message,
	// 				data: "oke"
	// 			});
	// 			return;
	// 		}
	
	// 		res.status(200).json({
	// 			message: 'Thêm data cơ sở dữ liệu',
	// 			data: results
	// 		})
	// 	});
	// })

});

router.delete('/hoadonnhap', (req, res) => {
	const { MAHD } = req.body;

	db.query(deleteHDNhap, [ MAHD ], (err, results) => {
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

router.patch('/hoadonnhap', (req, res) => {
	const {
		MAHD,
		NVXUAT,
		NGNHAP,
		TONG
	} = req.body;

	const updatedData = [
		NVXUAT,
		NGNHAP,
		TONG,
		MAHD,
	];

	db.query(updateHDNhap, updatedData, (err, results) => {
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