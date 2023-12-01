const express = require('express');
const router = express.Router();
const {
	tableDataDD,
	setForeignDD_0,
	setForeignDD_1,
	insertDataDD,
	deleteDD,
	updateDD
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/dondat', (req, res) => {
	db.query(tableDataDD, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/dondat', (req, res) => {

	const { MADD, NVDAT, NGAYDAT } = req.body;
	const newData = [
		MADD,
		NVDAT,
		NGAYDAT
	];
	if (MADD === '' || NVDAT === '' || NGAYDAT === '') {
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

router.delete('/dondat', (req, res) => {
	const { MADD } = req.body;

	db.query(deleteDD, [ MADD ], (err, results) => {
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

router.patch('/dondat', (req, res) => {
	const { 
		MADD,
		NVDAT,
		NGAYDAT,
	} = req.body;

	const updatedData = [
		NVDAT,
		NGAYDAT,
	]; 

	if (MADD === '' || NVDAT === '' || NGAYDAT === '') {
		res.json(
			401,
			{
				error: 1,
				message: 'Mời bạn nhập đầy đủ'
			}
		);
	} else {
		db.query(updateDD, [ NVDAT, NGAYDAT, MADD ], (err, results) => {
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