const selectTableNhanVien = 'select * from NHANVIEN';
const selectTableLogin = 'select * from NHANVIEN where TKHOAN = ? AND MKHAU = ?';

// QLĐơn Đặt
const tableDataDD = 'select * from DATDANG';
const insertDataDD = 'INSERT INTO DATDANG SET ?';


module.exports = {
	selectTableNhanVien,
	selectTableLogin,
	tableDataDD,
	insertDataDD
};
