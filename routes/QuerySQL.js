// NOTE: Sử dụng trong cơ sở dữ liệu

// Phần đơn đặt
const selectTableNhanVien = 'select * from NHANVIEN';
const selectTableThongNhanVien = 'select * from NHANVIEN where TKHOAN = ? and MKHAU = ? and CHUCVU = ?;'
const selectTableLogin = 'select * from NHANVIEN where TKHOAN = ? AND MKHAU = ?';

// NOTE: QLĐơn Đặt Phải fix lại khi sửa database
const tableDataDD = 'select * from dathang';
const setForeignDD_0 = 'SET FOREIGN_KEY_CHECKS = 0;';
const insertDataDD = 'INSERT INTO DATHANG(MADD,NVDAT,NGAYDAT) values (?, ?, ?);';
const setForeignDD_1 = 'SET FOREIGN_KEY_CHECKS = 1;';
const deleteDD = "delete from DATHANG where MADD = ?";
const updateDD = "update DATHANG set NVDAT = ?, NGAYDAT = ? where MADD = ?;"

// QL Nhân viên
const tableNhanVien = 'select * from NHANVIEN';
const insertNhanVien = 'INSERT INTO NHANVIEN (MANV,TENNV,DIACHI,NGAYSINH,GIOITINH,TRANGTHAI,SDT,TKHOAN,MKHAU,CHUCVU) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
const updatedNhanVien = "update NHANVIEN set TENNV = ?, DIACHI = ?, NGAYSINH = ?, GIOITINH = ?, TRANGTHAI = ?, SDT = ?, TKHOAN = ?, MKHAU = ?, CHUCVU = ? where MANV = ?;"
const updatedNhanVien1 = "update NHANVIEN set TENNV = ?, DIACHI = ?, NGAYSINH = ?, GIOITINH = ?, TRANGTHAI = ?, SDT = ?, TKHOAN = ?, MKHAU = ?, CHUCVU = ? where MANV = ?;"
const deleteNhanVien = "delete from NHANVIEN where MANV = ?;"


// QL Sản Phẩm
const tableSanPham = "select * from SANPHAM";
const insertSanPham = "INSERT INTO SANPHAM (MASP,TENSP,MANCC,LOAI,SOLUONG,DONGIA,HSD) VALUES (?, ?, ?, ?, ?, ?, ?);";
const updatedSanPham = "update SANPHAM "
		+ "set TENSP = ?,\n"
		+ "MANCC = ?, LOAI = ?, SOLUONG = ?, DONGIA = ?, HSD = ?\n"
		+ "where MASP = ?;";
const deleteSanPham = "delete from SANPHAM where MASP = ?";

// NOTE: QL Phiếu kiểm phải fix lại
const tablePK = "select * from PHIEUKIEM";
const setForeignPK_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const insertPK = "insert into PHIEUKIEM(MAPK,NVLAP,MASP,DONGIA,SLGIAO,NGLAP,TRANGTHAI) VALUES (?, ?, ?, ?, ?, ?, ?);";
const setForeignPK_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const updatedPK = "update PHIEUKIEM set NVLAP = ?, MASP = ?, DONGIA = ?, SLGIAO = ?, NGLAP = ?, TRANGTHAI = ? where MAPK = ?;";
const deletePK = "delete from PHIEUKIEM where MAPK = ?;";

// NOTE: QL Hóa đơn nhập phải fix lại
const tableHDNhap = "select * from HDNHAP";
const setForeignHDNhap_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignHDNhap_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const insertHDNhap = "INSERT INTO HDNHAP(MAHD,NVXUAT,NGNHAP,TONG) VALUES (?, ?, ?, ?);";
const updateHDNhap = "update HDNHAP set NVXUAT = ?, NGNHAP = ?, TONG = ? where MAHD = ?;";
const deleteHDNhap = "delete from HDNHAP where MAHD = ?;";

// NOTE: QL Nhà cung cấp phải fix lại
const tableNCC = "select * from NHACUNGCAP;";
const setForeignNCC_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignNCC_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const insertNCC = "INSERT INTO NHACUNGCAP (MANCC,TENNCC,DIACHI) VALUES (?, ?, ?);";
const deleteNCC = "delete from NHACUNGCAP where MANCC = ?;";
const updateNCC = "update NHACUNGCAP set TENNCC = ?, DIACHI = ? where MANCC = ?;"

// NOTE: QL Hóa Đơn phải fix lại
const tableHD = "select * from HOADON;";
const setForeignHD_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignHD_1 = "SET FOREIGN_KEY_CHECKS = 1;";
const insertHD = "INSERT INTO HOADON (MAHD,MAKH,NVXUAT,NGAYXUAT,TRANGTHAI) VALUES (?, ?, ?, ?, ?);";
const deleteHD = "delete from HOADON where MAHD = ?;";
const updateHD = "update HOADON set MAKH = ?,NVXUAT = ?, NGAYXUAT = ?,TRANGTHAI = ? where MAHD = ?;"

// NOTE: Lấy thông tin khách hàng
const tableKH = "select * from KHACHHANG";

// NOTE: Lấy thông chi tiết hóa đơn

// Quản lý tồn kho
const tableTonKho = "SELECT * FROM QLTonKho;";
const insertTonKho = "INSERT INTO QLTonKho (MASP,MANCC,TENSPTK,LOAI,SLTON,DONGIA,HSD) VALUES (?, ?, ?, ?, ?, ?, ?);";
const updateTonKho = "update QLTonKho set MANCC = ?, TenSPTK = ?, Loai = ?, SLTon = ?, DONGIA = ?, HSD = ? where MASP = ?;";
const deleteTonKho = "delete from QLTonKho where MASP = ?;";
const setForeignTonKho_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignTonKho_1 = "SET FOREIGN_KEY_CHECKS = 1;";

// Note: Chi tiết đơn hàng
const tableChiTietDonHang = "select * from CTHD left join HOADON on HOADON.MAHD = CTHD.MAHD where CTHD.MAHD = ?;";
const updateChiTietDonHang = "update CTHD set DONGIA = ?, SOLUONG = ? where (MAHD = ? and MASP = ?);";
const insertChiTietDonHang = "insert into CTHD(MAHD,MASP,DONGIA,SOLUONG) values (?, ?, ?, ?)";
const deleteChiTietDonHang = "delete from CTHD where (MAHD = ? and MASP = ?);";
const setForeignCTHD_0 = "SET FOREIGN_KEY_CHECKS = 0;";
const setForeignCTHD_1 = "SET FOREIGN_KEY_CHECKS = 1;";

// NOTE: Chi tiết đơn đặt
const tableDonDat = "select * from CTDH left join DATHANG on CTDH.MADD = DATHANG.MADD where CTDH.MADD = ?;";
const insertDonDat = "insert into CTDH(MADD,MASP,SOLUONG,DONGIA) values (?, ?, ?, ?);";
const updateDonDat = "update CTDH set SOLUONG = ?,DONGIA = ? where (MADD = ? and MASP = ?);";
const deleteDonDat = "delete from CTDH where (MADD = ? and MASP = ?);";

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
	// Chi tiết hóa đơn
	tableChiTietDonHang,
	updateChiTietDonHang,
	insertChiTietDonHang,
	deleteChiTietDonHang,
	setForeignCTHD_0,
	setForeignCTHD_1,
	// Lấy thông tin khách hàng
	tableKH,
	// Quản lý tồn kho
	tableTonKho,
	insertTonKho,
	updateTonKho,
	deleteTonKho,
	setForeignTonKho_0,
	setForeignTonKho_1,
	// Chi tiết đơn đặt
	tableDonDat,
	insertDonDat,
	updateDonDat,
	deleteDonDat,
};
