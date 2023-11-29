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

	if (MAKH === '' || NVXUAT === '' || NGAYXUAT === '' || TRANGTHAI === '') {

		res.status(200).json({
			message: 'Bạn cần nhập đầy đủ dữ liệu',
			error: 1
		});
		return;

	} else {
		
		db.query(insertHD, newData, (err, results) => {
			if (err) {
				res.status(400).json({
					message: err.message,
					error: 2
				});
				return;
			} else {
				res.status(200).json({
					message: 'Thêm data cơ sở dữ liệu',
					data: results,
					status: 'success'
				});
			}
	
		});

		// db.query(setForeignHD_0, (err, results) => {
		// 	db.query(insertHD, newData, (err, results) => {
		// 		if (err) {
		// 			res.status(400).json({
		// 				message: err.message,
		// 				error: 2
		// 			});
		// 			return;
		// 		} else {
		// 			res.status(200).json({
		// 				message: 'Thêm data cơ sở dữ liệu',
		// 				data: results,
		// 				status: 'success'
		// 			});
		// 		}
		
		// 	});
		// })
	}

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


	if (MAKH === '' || NVXUAT === '' || NGAYXUAT === '' || TRANGTHAI === '') {
		res.json(
			{
				message: "Bạn cần nhập đầy đủ dữ liệu",
				error: 1
			}
		);
		return;
	} else {
		db.query(updateHD, updatedData, (err, results) => {
			if (err) {
				res.status(400).json(
					{
						error: 2,
						message: err.message
					}
				);
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