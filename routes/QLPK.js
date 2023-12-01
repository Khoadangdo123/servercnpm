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


// NOTE: sửa
router.post('/phieukiem', (req, res) => {

	const { 
		MAPK,
		NVLAP,
		MASP,
		DONGIA,
		SLGIAO,
		NGLAP,
		TRANGTHAI
	} = req.body;
	const newData = [
		MAPK,
		NVLAP,
		MASP,
		DONGIA,
		SLGIAO,
		NGLAP,
		TRANGTHAI
	];

	if (MAPK === '' || NVLAP === '' || MASP === '' ||
			DONGIA === '' || SLGIAO === '' || NGLAP === '' || TRANGTHAI === '') {
		res.status(200).json({
			error: 1,
			message: "Cần bạn nhập đầy đủ thông tin"
		});
		return;
	} else {
		if (Number(DONGIA) <= 0 || Number(SLGIAO) <= 0) {
			res.status(200).json({
				error: 2,
				message: "Bạn cần nhập số dương"
			});
		} else {
			db.query(insertPK, newData, (err, results) => {
				if (err) {
					res.status(400).json({
						error: 3,
						message: err.message
					});
					return;
				}
		
				res.status(200).json({
					message: 'Thêm data cơ sở dữ liệu',
					data: results,
					status: 'success'
				});
			});
			// db.query(setForeignPK_0, (err, results) => {
			// 	db.query(insertPK, newData, (err, results) => {
			// 		if (err) {
			// 			res.status(400).json({
			// 				error: 3,
			// 				message: err.message
			// 			});
			// 			return;
			// 		}
			
			// 		res.status(200).json({
			// 			message: 'Thêm data cơ sở dữ liệu',
			// 			data: results,
			// 			status: 'success'
			// 		});
			// 	});
			// });
		}
	}


});

router.delete('/phieukiem', (req, res) => {
	const { MAPK } = req.body;


	if (Number(SLGIAO) >= 0) {
		res.json({
			error: 2,
			message: 'Số lượng tồn lớn hơn 0, Xóa không thành công'
		})
	} else {
		db.query(deletePK, [ MAPK ], (err, results) => {
			if (err) {
				res.status(400).json({
					error: 1,
					message: err.message
				});
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

// NOTE: sửa
router.patch('/phieukiem', (req, res) => {
	const {
		MAPK,
		NVLAP,
		MASP,
		DONGIA,
		SLGIAO,
		NGLAP,
		TRANGTHAI
	} = req.body;

	const updatedData = [
		NVLAP,
		MASP,
		DONGIA,
		SLGIAO,
		NGLAP,
		TRANGTHAI,
		MAPK,
	];


	if (
		NVLAP === '' || MASP === '' || DONGIA === '' ||
		SLGIAO === '' || NGLAP === '' || TRANGTHAI === '' || MAPK === ''
	) {
		res.json({
			error: 1,
			message: 'Cần bạn nhập đủ thông tin'
		})
	} else {
		if (Number(SLGIAO) <= 0 || Number(DONGIA) <= 0) {
			res.json({
				error: 2,
				message: 'Cần bạn nhập thông tin là số nguyên dương'
			})
		} else {
			db.query(updatedPK, updatedData, (err, results) => {
				if (err) {
					res.status(400).json({
						error: 3,
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
	}

})


module.exports = router;