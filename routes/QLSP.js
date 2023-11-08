const express = require('express');
const router = express.Router();
const {
	tableSanPham,
	insertSanPham,
	updatedSanPham,
	deleteSanPham
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/sanpham', (req, res) => {
	db.query(tableSanPham, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/sanpham', (req, res) => {

	const { MASP, TENSP, MANCC, LOAI, SOLUONG, DONGIA, HSD } = req.body;
	const newData = [
		MASP, 
		TENSP, 
		MANCC, 
		LOAI, 
		SOLUONG, 
		DONGIA, 
		HSD
	];

	db.query(insertSanPham, newData, (err, results) => {
		if (err) {
			res.status(400).json(err.message);
			return;
		}

		res.status(200).json({
			message: 'Thêm data cơ sở dữ liệu',
			data: results
		})
	});
});

router.delete('/sanpham', (req, res) => {
	const { MASP } = req.body;

	db.query(deleteSanPham, [ MASP ], (err, results) => {
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

router.patch('/sanpham', (req, res) => {
	const {
		MASP,
		TENSP,
		MANCC,
		LOAI,
		SOLUONG,
		DONGIA,
		HSD
	} = req.body;

	const updatedData = [
		TENSP,
		MANCC,
		LOAI,
		SOLUONG,
		DONGIA,
		HSD,
		MASP,
	];

	db.query(updatedSanPham, updatedData, (err, results) => {
		if (err) {
			res.status(400).json(err.message);
			return;
		}

		res.json({
			message: 'Cập nhật dữ liệu thành công',
			data: updatedData
		});
	});
})


module.exports = router;