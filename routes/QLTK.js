const express = require('express');
const router = express.Router();
const {
	tableNhanVien,
	insertNhanVien,
	updatedNhanVien,
	deleteNhanVien
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/nhanvien', (req, res) => {
	db.query(tableNhanVien, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/nhanvien', (req, res) => {

	const { MANV, TENNV, DIACHI, NGAYSINH, GIOITINH, TRANGTHAI, SDT, TKHOAN, MKHAU, CHUCVU } = req.body;
	const newData = [
		MANV, 
		TENNV, 
		DIACHI, 
		NGAYSINH, 
		GIOITINH, 
		TRANGTHAI, 
		SDT, 
		TKHOAN, 
		MKHAU, 
		CHUCVU
	];

	db.query(insertNhanVien, newData, (err, results) => {
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

router.delete('/nhanvien', (req, res) => {
	const { MANV } = req.body;

	db.query(deleteNhanVien, [ MANV ], (err, results) => {
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

router.patch('/nhanvien', (req, res) => {
	const {
		MANV,
		TENNV,
		DIACHI,
		NGAYSINH,
		GIOITINH,
		TRANGTHAI,
		SDT,
		TKHOAN,
		MKHAU,
		CHUCVU,
	} = req.body;

	const updatedData = [
		TENNV,
		DIACHI,
		NGAYSINH,
		GIOITINH,
		TRANGTHAI,
		SDT,
		TKHOAN,
		MKHAU,
		CHUCVU,
		MANV
	];

	db.query(updatedNhanVien, updatedData, (err, results) => {
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