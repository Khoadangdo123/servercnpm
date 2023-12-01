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

		if (MASP === '' || TENSP === '' || MANCC === '' || LOAI === '' || SOLUONG === '' || DONGIA === '' || HSD === '') {
			res.status(200).json({
				error: 1,
				message: 'Bạn cần nhập đầy đủ thông tin'
			});
			return;
		} else {
			if (Number(SOLUONG) < 0) {
				res.json({
					error: 2,
					message: 'Số lượng bạn cần nhập là số dương'
				});
				return;
			} else if (Number(DONGIA) < 0) {
				res.json({
					error: 3,
					message: 'Số lượng đơn giá cần nhập là số dương'
				});
				return;
			} else {

				if (err) {
					res.status(400).json({
						error: 'error',
						message: err.message
					});
					return;
				} else {
					res.status(200).json({
						message: 'Thêm data cơ sở dữ liệu',
						data: results,
						status: 'success'
					});
					return;
				}

			}
		}

	});
});

router.delete('/sanpham', (req, res) => {
	const { MASP, SOLUONG } = req.body;


	if (Number(SOLUONG) >= 0) {
		res.json({
			error: 1,
			message: 'Số lượng sản phẩm còn, Xóa không thành công'
		})
	} else {
		db.query(deleteSanPham, [ MASP ], (err, results) => {
			if (err) {
				res.status(400).json(
					{
						error: 2,
						message: err.message
					}
				);
				return;
			}
	
			res.json({
				message: 'Xóa dữ liệu thành công',
				data: results,
				status: 'delete success'
			});
		});
	}

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

		if (TENSP === '' || MANCC === '' || LOAI === '' || SOLUONG === '' || DONGIA === '' || HSD === '') {
			res.json({
				error: 1,
				message: 'Bạn cần nhập đầy đủ thông tin'
			})
		} else {
			if (Number(SOLUONG) < 0) {
				res.json({
					error: 2,
					message: 'Bạn cần nhập số lượng là số dương'
				});
				return;
			} else if (Number(DONGIA) < 0) {
				res.json({
					error: 3,
					message: 'Bạn cần nhập đơn giá là số dương'
				});
				return;
			} else {
				if (err) {
					res.status(400).json({
						error: 'error',
						message: err.message
					});
					return;
				}
		
				res.json({
					message: 'Cập nhật dữ liệu thành công',
					data: updatedData,
					status: 'success'
				});
			}


		}

	});
})


module.exports = router;