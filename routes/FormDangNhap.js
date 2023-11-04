const express = require('express');
const router = express.Router();
const {
	selectTableNhanVien,
	selectTableLogin
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
			&& dataEle['CHUVU'] === chucvu
		);

		if (logInSession) {
			res.json(
				{
					logIn: true,
					message: 'Login Success',
					dataUser: results
				}
			)
		} else {
			res.json(
				{
					LogIn: false,
					message: 'Login Failed'
				}
			)
		}

	});

});

router.get('/dangxuat', () => {

});

module.exports = router;