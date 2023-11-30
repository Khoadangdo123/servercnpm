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
	if (MAHD === '' || NVXUAT === '' || NGNHAP === '' || TONG === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Bạn cần nhập đầy đủ thông tin'
			}
		)
	} else {

		db.query(insertDataDD, newData, (err, results, fields) => {
			if (err) {
				res.json(
					400,
					{
					error: 2,
					message: err.message
				});
				return;
			}

			db.query(setForeignDD_1, (err, results) => {
				res.status(200).json({
					message: 'Thêm dữ liệu thành công',
					data: results,
					status: 'success'
				});
			})
		});		
	}
});

router.delete('/hoadonnhap', (req, res) => {
	const { MAHD } = req.body;

	db.query(deleteHDNhap, [ MAHD ], (err, results) => {
		if (err) {
			res.status(400).json(
				{
				error: 1,
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
		TONG
	]

	if (MAHD === '' || NVXUAT === '' || NGNHAP === '' || TONG === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Mời bạn nhập đầy đủ'
			}
		);
	} else {
		db.query(updateDD, [ NVXUAT, NGNHAP, TONG ], (err, results) => {
			if (err) {
				res.status(400).json({
					error: 2,
					message: err.message
				});
				return;
			}
	
			res.json({
				message: 'Cập nhật dữ liệu thành công',
				data: results,
				status: 'success'
			});
		});

	}
})


module.exports = router;