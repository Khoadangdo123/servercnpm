const express = require('express');
const router = express.Router();
const {
	sanPhamBanChay,
	sanPhamBanItNhat,
	hoaDonChoThanhToan,
	nhanVienDaNghi,
	nhanVienDangLam,
	sanPhamHet,
	soLuongNhanVien,
	soLuongSanPham,
	tongDoanhThu,
	soLuongDonHuy,
	soLuongDonHang
} = require('./QuerySQL.js');
const db = require('../Database.js');
const nodemon = require('nodemon');

router.get('/sanphambanchay', (req, res) => {
	db.query(sanPhamBanChay, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.get('/sanphambanit', (req, res) => {
	db.query(sanPhamBanItNhat, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/hondonchothanhtoan', (req, res) => {
	db.query(hoaDonChoThanhToan, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/nhanviendanghi', (req, res) => {
	db.query(nhanVienDaNghi, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/nhanviendanglam', (req, res) => {
	db.query(nhanVienDangLam, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/sanphamhet', (req, res) => {
	db.query(sanPhamHet, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

// Header Title
router.get('/soluongnvdanglam', (req, res) => {
	db.query(soLuongNhanVien, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/tongsoluongsanpham', (req, res) => {
	db.query(soLuongSanPham, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/tongdoanhthu', (req, res) => {
	db.query(tongDoanhThu, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/soluongdonhuy', (req, res) => {
	db.query(soLuongDonHuy, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

router.get('/soluongdonhang', (req, res) => {
	db.query(soLuongDonHang, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	});
});

module.exports = router;