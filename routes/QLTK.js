const express = require('express');
const router = express.Router();
const {
	tableNhanVien,
	insertNhanVien,
	updatedNhanVien,
	deleteNhanVien
} = require('./QuerySQL.js');
const db = require('../Database.js');
const nodemon = require('nodemon');

router.get('/nhanvien', (req, res) => {
	db.query(tableNhanVien, (err, results, fields) => {
		if (err) {
			res.status(400).json('Error executing query:', err);
			return;
		}

		res.status(200).json({
			data: results
		});
	})
});

router.post('/nhanvien', (req, res) => {

	function capitalizeAllFirstLetters(inputString) {
		// Chia chuỗi thành mảng các từ
		const words = inputString.split(" ");
	
		// Chuyển đổi chữ cái đầu của mỗi từ thành chữ cái hoa
		const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
	
		// Gắn kết các từ lại thành một chuỗi và trả về
		return capitalizedWords.join(" ");
	}

	const { MANV, TENNV, DIACHI, NGAYSINH, GIOITINH, TRANGTHAI, SDT, TKHOAN, MKHAU, CHUCVU } = req.body;
	const newData = [
		MANV, 
		capitalizeAllFirstLetters(TENNV), 
		DIACHI, 
		NGAYSINH, 
		GIOITINH, 
		TRANGTHAI, 
		SDT, 
		TKHOAN, 
		MKHAU, 
		CHUCVU
	];

	function isValidFullName(fullName) {
		// Kiểm tra xem có phải là một chuỗi không rỗng không
		if (fullName.trim() === "") {
			return false;
		}
	
		// Kiểm tra xem có ít nhất một dấu cách (gợi ý là chỉ có họ và tên)
		if (fullName.split(" ").length < 2) {
			return false;
		}
	
		// Nếu không có điều kiện đặc biệt nào khác, trả về true
		return true;
	}

	if (
		MANV === '' || TENNV === '' || DIACHI === '' || NGAYSINH === '' || GIOITINH === '' || 
		TRANGTHAI === '' || SDT === '' || TKHOAN === '' || MKHAU === '' || CHUCVU === ''
	) {
		res.json({
			error: 1,
			message: 'Cần bạn nhập đầy đủ',
		});
		return;
	} else {

		if (SDT.length !== 10) {
			res.json(
				401,
				{
					error: 2,
					message: 'Bạn nhập đủ số điện thoại'
				}
			);
			return;
		} else if (isValidFullName(TENNV) === false) {
			res.json(
				401,
				{
					error: 3,
					message: 'Cần bạn nhập đúng họ tên'
				}
			);
			return;
		}
		else {

			db.query(insertNhanVien, newData, (err, results) => {
				if (err) {
					res.status(400).json({
						error: 2,
						message: err.message
					});
					return;
				} else {
					res.status(200).json({
						message: 'Thêm data cơ sở dữ liệu',
						data: results,
						status: 'success'
					});
					return;
				}
		
			});
		}

	}

});

router.delete('/nhanvien', (req, res) => {
	const { MANV, TRANGTHAI } = req.body;


	if (TRANGTHAI === 'Đã nghỉ') {
		db.query(deleteNhanVien, [ MANV ], (err, results) => {
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
	} else {
		res.json({
			error: 2,
			message: 'Tài khoản vẫn còn hiệu lực, Xóa không thành công'
		})
	}
	

});

router.patch('/nhanvien', (req, res) => {

	function capitalizeAllFirstLetters(inputString) {
		// Chia chuỗi thành mảng các từ
		const words = inputString.split(" ");
	
		// Chuyển đổi chữ cái đầu của mỗi từ thành chữ cái hoa
		const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
	
		// Gắn kết các từ lại thành một chuỗi và trả về
		return capitalizedWords.join(" ");
	}

	function isValidFullName(fullName) {
		// Kiểm tra xem có phải là một chuỗi không rỗng không
		if (fullName.trim() === "") {
			return false;
		}
	
		// Kiểm tra xem có ít nhất một dấu cách (gợi ý là chỉ có họ và tên)
		if (fullName.split(" ").length < 2) {
			return false;
		}
	
		// Nếu không có điều kiện đặc biệt nào khác, trả về true
		return true;
	}

	const {
		MANV,
		TENNV,
		DIACHI,
		NGAYSINH,
		GIOITINH,
		TRANGTHAI,
		SDT,
		TKHOAN,
		MKHAU,
		CHUCVU,
	} = req.body;

	const updatedData = [
		capitalizeAllFirstLetters(TENNV),
		DIACHI,
		NGAYSINH,
		GIOITINH,
		TRANGTHAI,
		SDT,
		TKHOAN,
		MKHAU,
		CHUCVU,
		MANV
	];


	if (
		MANV === '' || TENNV === '' || DIACHI === '' || NGAYSINH === '' || GIOITINH === '' ||
		TRANGTHAI === '' || SDT === '' || TKHOAN === '' || MKHAU === '' || CHUCVU === ''
	) {
		res.status(200).json(
			{
				error: 1,
				message: 'Bạn cần nhập đầy đủ dữ liệu'
			}
		);
		return;
	} else {
		if (SDT.length !== 10) {

			res.status(200).json(
				{
					error: 2,
					message: 'Bạn cần sửa đúng số điện thoại'
				}
			)
			return;
		} else if (isValidFullName(TENNV) === false) {
			res.status(200).json(
				{
					error: 3,
					message: 'Bạn cần đúng tên'
				}
			)
			return;
		}
		db.query(updatedNhanVien, updatedData, (err, results) => {
			if (err) {
				res.status(400).json({
					error: 4,
					message: err.message
				});
				return;
			} else {
				res.status(200).json({
					message: 'Cập nhật dữ liệu thành công',
					data: updatedData,
					status: 'success'
				});
				return;
			}

		});

	}

})


module.exports = router;