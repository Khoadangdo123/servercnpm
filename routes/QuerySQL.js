// NOTE: Sử dụng trong cơ sở dữ liệu

// Phần đơn đặt
const selectTableNhanVien = 'select * from NHANVIEN';
const selectTableThongNhanVien = 'select * from NHANVIEN where TKHOAN = ? and MKHAU = ? and CHUCVU = ?;'
const selectTableLogin = 'select * from NHANVIEN where TKHOAN = ? AND MKHAU = ?';

// NOTE: QLĐơn Đặt Phải fix lại khi sửa database
const tableDataDD = 'select * from dathang';
const setForeignDD_0 = 'SET FOREIGN_KEY_CHECKS = 0;';
const insertDataDD = 'INSERT INTO DATHANG(MADD,NVDAT,NGDAT) values (?, ?, ?);';
const setForeignDD_1 = 'SET FOREIGN_KEY_CHECKS = 1;';
const deleteDD = "delete from DATHANG where MADD = ?";
const updateDD = "update DATHANG set NVDAT = ?, NGDAT = ? where MADD = ?;"

// QL Nhân viên
const tableNhanVien = 'select * from NHANVIEN';
const insertNhanVien = 'INSERT INTO NHANVIEN (MANV,TENNV,DIACHI,NGAYSINH,GIOITINH,TRANGTHAI,SDT,TKHOAN,MKHAU,CHUCVU) VALUES (MANV,TENNV,DIACHI,NGAYSINH,GIOITINH,TRANGTHAI,SDT,TKHOAN,MKHAU,CHUCVU);'
const updatedNhanVien = "update NHANVIEN set TENNV = ?, DIACHI = ?, NGAYSINH = ?, GIOITINH = ?, TRANGTHAI = ?, SDT = ?, TKHOAN = ?, MKHAU = ?, CHUCVU = ? where MANV = ?;"
const deleteNhanVien = "delete from NHANVIEN where MANV = ?;"

// QL Sản Phẩm
const tableSanPham = "select * from SANPHAM";
const insertSanPham = "INSERT INTO SANPHAM (MASP,TENSP,MANCC,LOAI,SOLUONG,DONGIA,HSD) VALUES (?, ?, ?, ?, ?, ?, ?);";
const updatedSanPham = "update SANPHAM "
		+ "set TENSP = ?,\n"
		+ "MANCC = ?, LOAI = ?, SOLUONG = ?, DONGIA = ?, HSD = ?\n"
		+ "where MASP = ?;";
const deleteSanPham = "delete from SANPHAM where MASP = ?";

// NOTE: QL Phiếu kiểm phải fix lại => FIX XONG
const tablePK = "select * from PHIEUKIEM";
const setForeignPK_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const insertPK = "insert into PHIEUKIEM(MAPK,NVLAP,MASP,DONGIA,SLGIAO,NGLAP,TRANGTHAI) VALUES (?, ?, ?, ?, ?, ?, ?);";
const setForeignPK_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const updatedPK = "update PHIEUKIEM set NVLAP = ?, MASP = ?, DONGIA = ?, SLGIAO = ?, NGLAP = ?, TRANGTHAI = ? where MAPK = ?;";
const deletePK = "delete from PHIEUKIEM where MAPK = ?;";

// NOTE: QL Hóa đơn nhập phải fix lại => FIX XONG
const tableHDNhap = "select * from HDNHAP";
const setForeignHDNhap_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignHDNhap_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const insertHDNhap = "INSERT INTO HDNHAP(MAHD,NVXUAT,MASP,DONGIA,SOLUONG,NGAYNHAP,TONG) VALUES (?, ?, ?, ?, ?, ?, ?);";
const updateHDNhap = "update HDNHAP set NVXUAT = ?, MASP = ?, DONGIA = ?, SOLUONG = ?, NGNHAP = ?, TONG = ? where MAHD = ?;";
const deleteHDNhap = "delete from HDNHAP where MAHD = ?;";

// NOTE: QL Nhà cung cấp phải fix lại => ko co gi de fix => FIX XONG
const tableNCC = "select * from NHACUNGCAP;";
const setForeignNCC_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignNCC_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const insertNCC = "INSERT INTO NHACUNGCAP (MANCC,TENNCC,DIACHI) VALUES (?, ?, ?);";
const deleteNCC = "delete from NHACUNGCAP where MANCC = ?;";
const updateNCC = "update NHACUNGCAP set TENNCC = ?, DIACHI = ? where MANCC = ?;"

// NOTE: QL Hóa Đơn phải fix lại => FIX XONG
const tableHD = "select * from HOADON;";
const setForeignHD_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignHD_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const insertHD = "INSERT INTO HOADON(MAHD,MAKH,NVXUAT,MASP,DONGIA,SOLUONG,NGAYXUAT,TONGTIEN,TRANGTHAI) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
const deleteHD = "delete from HOADON where MAHD = ?";
const updateHD = "update HOADON set MAKH = ?, NVXUAT = ?, MASP = ?, DONGIA = ?, SOLUONG = ?, NGAYXUAT = ?, TONGTIEN = ?, TRANGTHAI = ? where MAHD = ?;"

// NOTE: Lấy thông tin khách hàng
const tableKH = "select * from KHACHHANG";

module.exports = {
	// Đăng Nhập
	selectTableNhanVien,
	selectTableLogin,
	selectTableThongNhanVien,
	// Quản 
	tableDataDD,
	insertDataDD,
	setForeignDD_0,
	setForeignDD_1,
	deleteDD,
	updateDD,
	// Quản lý Nhân viên
	tableNhanVien,
	insertNhanVien,
	updatedNhanVien,
	deleteNhanVien,
	// Quản lý Sản Phẩm
	tableSanPham,
	insertSanPham,
	updatedSanPham,
	deleteSanPham,
	// Quản lý phiếu kiểm
	tablePK,
	insertPK,
	updatedPK,
	deletePK,
	setForeignPK_0,
	setForeignPK_1,
	// Quản lý Hóa đơn nhập
	tableHDNhap,
	insertHDNhap,
	updateHDNhap,
	deleteHDNhap,
	setForeignHDNhap_0,
	// Quản lý Nhà cung cấp
	tableNCC,
	setForeignNCC_0,
	setForeignNCC_1,
	insertNCC,
	deleteNCC,
	updateNCC,
	// Quản lý hóa đơn
	tableHD,
	setForeignHD_0,
	setForeignHD_1,
	insertHD,
	deleteHD,
	updateHD,
	// Lấy thông tin khách hàng
	tableKH
};
