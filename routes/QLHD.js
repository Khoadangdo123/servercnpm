const express = require('express');
const router = express.Router();
	
const {
	tableHD,
	setForeignHD_0,
	setForeignHD_1,
	insertHD,
	deleteHD,
	updateHD
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/hoadon', (req, res) => {
	db.query(tableHD, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/hoadon', (req, res) => {

	const { MAHD,MAKH,NVXUAT,NGAYXUAT,TRANGTHAI } = req.body;
	const newData = [
		MAHD,
		MAKH,
		NVXUAT,
		NGAYXUAT,
		TRANGTHAI
	];

	db.query(setForeignHD_0, (err, results) => {
		db.query(insertHD, newData, (err, results) => {
			if (err) {
				res.status(400).json({
					error: err.message,
					// data: "oke"
				});
				return;
			}
	
			res.status(200).json({
				message: 'Thêm data cơ sở dữ liệu',
				data: results
			})
		});
	})

});

router.delete('/hoadon', (req, res) => {
	const { MAHD } = req.body;

	db.query(setForeignHD_0, (err, results) => {
		db.query(deleteHD, [ MAHD ], (err, results) => {
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

router.patch('/hoadon', (req, res) => {
	const {
		MAHD,
		MAKH,
		NVXUAT,
		NGAYXUAT,
		TRANGTHAI
	} = req.body;

	const updatedData = [
		MAKH,
		NVXUAT,
		NGAYXUAT,
		TRANGTHAI,
		MAHD
	];

	db.query(updateHD, updatedData, (err, results) => {
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
})


module.exports = router;