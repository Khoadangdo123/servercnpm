const express = reqiure('express');
const router = express.Router();
const {
	tableDataDD,
	insertDataDD
} = reqiure('../Database.js')

router.get('/dondat', (req, res) => {
	
});

module.exports = router;