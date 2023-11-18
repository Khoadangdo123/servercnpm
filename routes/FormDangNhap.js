const express = require('express');
const router = express.Router();
const {
	selectTableNhanVien,
	selectTableLogin,
	selectTableThongNhanVien
} = require('./QuerySQL.js')
const db = require('../Database.js');


function convertDataSQL(array) {
	const jsonString = JSON.stringify(array);
	const result = JSON.parse(jsonString);
	return result;
}

router.post('/dangnhap', (req, res) => {
	// Authenticate user (you'll implement this part)
  const { username, password, chucvu } = req.body;
	
	db.query(selectTableNhanVien, (err, results, fields) => {
		if (err) {
			res.json('Error executing query:', err);
			return;
		}
		const data = convertDataSQL(results);
		const logInSession = data.some((dataEle) => 
			dataEle['TKHOAN'] === username 
			&& dataEle['MKHAU'] === password 
			&& dataEle['CHUCVU'] === chucvu
		);

		var checkUsername = data.some(obj => Object.values(obj).includes(username));
		var checkPassword = data.some(obj => Object.values(obj).includes(password));
		var checkChucvu = data.some(obj => Object.values(obj).includes(chucvu))

		if (logInSession) {
			db.query(selectTableThongNhanVien, [username, password, chucvu], (error, results, fields) => {
				res.json(
					{
						logIn: 1,
						message: 'Login Success',
						dataUser: results
					}
				)
			})
		} else {
			if (username == "" || password == "" || chucvu == "") {
				res.json(
					{
						logIn: 3,
						message: "Ban chưa nhập đủ thông tin"
					}
				);

			} else {

				if (checkUsername === true && checkPassword === false) {

					if (checkChucvu === false) {
						res.json({
							logIn: 4,
							message: 'Bạn nhập sai mật khẩu và chức vụ'
						});
					} else {
						res.json({
							logIn: 6,
							message: 'Bạn nhập sai mật khẩu'
						});
					}
					
				} else if (checkUsername === false && checkPassword === true) {
					// console.log(checkChucvu)
					if (checkChucvu === false) {
						res.json({
							logIn: 5,
							message: 'Bạn nhập sai tài khoản'
						});
					} else {
						res.json({
							logIn: 7,
							message: 'Bạn nhập sai tài khoản và chức vụ'
						});
					}


				} else if (checkUsername === true && checkPassword === true) {
					if (checkChucvu === false) {
						res.json({
							logIn: 8,
							message: 'Bạn nhập sai chức vụ'
						});
					} else {
						res.json({
							logIn: 10,
							message: 'Không tìm thấy chức vụ'
						})
					}
				} else {
					if (checkChucvu === false) {
						res.json({
							logIn: 2,
							message: 'Bạn nhập sai tài khoản và mật khẩu và chức vụ'
						});
					} else {
						res.json({
							logIn: 9,
							message: 'Bạn nhập sai tài khoản và mật khẩu'
						})
					}
				}
				
			}
		}

	});

});

router.get('/dangxuat', () => {

});

module.exports = router;