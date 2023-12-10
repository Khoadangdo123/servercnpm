const express = require('express');
const router = express.Router();

const {
	tableNCC,
	setForeignNCC_0,
	setForeignNCC_1,
	insertNCC,
	deleteNCC,
	updateNCC,
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/nhacungcap', (req, res) => {
	db.query(tableNCC, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/nhacungcap', (req, res) => {

	const { MANCC,TENNCC,DIACHI } = req.body;
	const newData = [
		MANCC,
		TENNCC,
		DIACHI
	];
	if (MANCC === '' || TENNCC === '' || DIACHI === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Bạn cần nhập đầy đủ thông tin'
			}
		)
	} else {

		db.query(insertNCC, newData, (err, results, fields) => {
			if (err) {
				res.json(
					400,
					{
					error: 2,
					message: err.message
				});
				return;
			}

			res.status(200).json({
				message: 'Thêm dữ liệu thành công',
				data: results,
				status: 'success'
			});
		})
	}
});

router.delete('/nhacungcap', (req, res) => {
	const { MANCC } = req.body;

	db.query(deleteNCC, [ MANCC ], (err, results) => {
		if (err) {
			res.status(400).json(
				{
					error: 1,
					message: err.message
				}
			);
		}

		res.json({
			message: 'Xóa dữ liệu thành công',
			data: results,
			status: 'delete success'
		});
	});
});

router.patch('/nhacungcap', (req, res) => {
	const {
		MANCC,
		TENNCC,
		DIACHI
	} = req.body;

	const updatedData = [
		TENNCC,
		DIACHI
	]

	if (MANCC === '' || TENNCC === '' || DIACHI === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Bạn cần nhập đầy đủ thông tin'
			}
		);
	} else {
		db.query(updateNCC, [ TENNCC, DIACHI, MANCC ], (err, results) => {
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
});


module.exports = router;