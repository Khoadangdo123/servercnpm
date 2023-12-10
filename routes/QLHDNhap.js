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
		} else {
			res.status(200).json({
				data: results
			});
		}

	})
});

router.post('/hoadonnhap', (req, res) => {

	const { MAHD,NVXUAT,NGAYNHAP } = req.body;
	const newData = [
		MAHD,
		NVXUAT,
		NGAYNHAP
	];

	if (MAHD === '' || NVXUAT === '' || NGAYNHAP === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Bạn cần nhập đầy đủ thông tin'
			}
		)
		return;
	} else {

		db.query(insertHDNhap, newData, (err, results, fields) => {
			if (err) {
				res.json(
					400,
					{
					error: 2,
					message: err.message
				});
				return;
			} else {
				res.status(200).json({
					message: 'Thêm dữ liệu thành công',
					data: results,
					status: 'success'
				});
				return;
			}
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
		} else {
			res.json({
				message: 'Xóa dữ liệu thành công',
				data: results,
				status: 'delete success'
			});
			return;
		}

	});
});

router.patch('/hoadonnhap', (req, res) => {
	const {
		MAHD,
		NVXUAT,
		NGAYNHAP
	} = req.body;

	if (MAHD === '' || NVXUAT === '' || NGAYNHAP === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Mời bạn nhập đầy đủ'
			}
		);
		return;
	} else {
		db.query(updateHDNhap, [ MAHD, NVXUAT, NGAYNHAP ], (err, results) => {
			if (err) {
				res.status(400).json({
					error: 2,
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
	
		});

	}
})


module.exports = router;