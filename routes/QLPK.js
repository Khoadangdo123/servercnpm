const express = require('express');
const router = express.Router();

const {
	tablePK,
	insertPK,
	updatedPK,
	deletePK,
	setForeignPK_0,
	setForeignPK_1
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/phieukiem', (req, res) => {
	db.query(tablePK, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/phieukiem', (req, res) => {

	const { MAPK,NVLAP,NGLAP,TRANGTHAI } = req.body;
	const newData = [
		MAPK,
		NVLAP,
		NGLAP,
		TRANGTHAI
	];

	db.query(setForeignPK_0, (err, results) => {
		db.query(insertPK, newData, (err, results) => {
			if (err) {
				res.status(400).json({
					error: err.message,
					data: "oke"
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

router.delete('/phieukiem', (req, res) => {
	const { MAPK } = req.body;

	db.query(deletePK, [ MAPK ], (err, results) => {
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

router.patch('/phieukiem', (req, res) => {
	const {
		MAPK,
		NVLAP,
		NGLAP,
		TRANGTHAI
	} = req.body;

	const updatedData = [
		NVLAP,
		NGLAP,
		TRANGTHAI,
		MAPK
	];

	db.query(updatedPK, updatedData, (err, results) => {
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