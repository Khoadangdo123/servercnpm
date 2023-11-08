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

	db.query(insertNCC, newData, (err, results) => {
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

});

router.delete('/nhacungcap', (req, res) => {
	const { MANCC } = req.body;

	db.query(setForeignNCC_0, (err, results) => {
		db.query(deleteNCC, [ MANCC ], (err, results) => {
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
});

router.patch('/nhacungcap', (req, res) => {
	const {
		MANCC,
		TENNCC,
		DIACHI
	} = req.body;

	const updatedData = [
		TENNCC,
		DIACHI,
		MANCC,
	];

	db.query(updateNCC, updatedData, (err, results) => {
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