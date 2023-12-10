const express = require('express');
const router = express.Router();
const {
	tableTonKho,
	insertTonKho,
	updateTonKho,
	deleteTonKho,
	setForeignTonKho_0,
	setForeignTonKho_1
} = require('./QuerySQL.js');
const db = require('../Database.js');

router.get('/tonkho', (req, res) => {
	db.query(tableTonKho, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/tonkho', (req, res) => {

	const {
		MASP,
		MANCC,
		TenSPTK,
		Loai,
		SLTon,
		DONGIA,
		HSD
	} = req.body;
	const newData = [
		MASP,
		MANCC,
		TenSPTK,
		Loai,
		SLTon,
		DONGIA,
		HSD
	];

	if (
		MASP === '' || MANCC === '' || TenSPTK === '' ||
    Loai === '' || SLTon === '' || DONGIA === '' || HSD === ''
	) {
		res.status(200).json({
			error: 1,
			message: "Bạn cần nhập đầy đủ thông tin"
		});
		return;
	} else {
		db.query(insertTonKho, newData, (err, results) => {
			if (Number(SLTon) <= 0 || Number(DONGIA) <= 0) {
				res.status(200).json({
					error: 2,
					message: "Bạn cần nhập số dương"
				});
				return;

			} else {
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
			}

		});
	}

});

router.delete('/tonkho', (req, res) => {
	const { MASP, SLTon } = req.body;

	if (Number(SLTon) > 0) {
		res.json({
			error: 2,
			message: 'Số lượng tồn kho lớn 0, Xóa không thành công'
		})
	} else {
		db.query(deleteTonKho, [MASP], (err, results) => {
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

router.patch('/tonkho', (req, res) => {
	const {
		MASP,
		MANCC,
		TenSPTK,
		Loai,
		SLTon,
		DONGIA,
		HSD
	} = req.body;

	const updatedData = [
		MANCC,
		TenSPTK,
		Loai,
		SLTon,
		DONGIA,
		HSD,
		MASP,
	];

	if (
		MASP === '' || MANCC === '' || TenSPTK === '' ||
    Loai === '' || SLTon === '' || DONGIA === '' || HSD === ''
	) {
		res.status(200).json({
			error: 1,
			message: 'Bạn cần nhập đầy đủ thông tin'
		})
	} else {
		if (Number(SLTon) < 0 || Number(DONGIA) < 0) {
			res.status(200).json({
				error: 2,
				message: "Cần bạn nhập số dương"
			});
			return;
		} else {
			db.query(updateTonKho, updatedData, (err, results) => {
				if (err) {
					res.status(400).json({
						error: 3,
						message: err.message
					});
					return;
				}
		
				res.json({
					message: 'Cập nhật dữ liệu thành công',
					data: updatedData,
					status: 'success'
				});
			});
		}
	}
})


module.exports = router;