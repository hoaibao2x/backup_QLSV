/** 
 * Khai báo lớp đối tượng sinh viên
 * - Khai báo các thuộc tính, phương thức chung của các đối tượng sinh viên
 * 
 * */

function SinhVien(maSV, tenSV, email, password, ngaySinh, khoaHoc, diemToan, diemLy, diemHoa) {
    // Thuộc tính
    this.maSV = maSV;
    this.tenSV = tenSV;
    this.email = email;
    this.password = password;
    this.ngaySinh = ngaySinh;
    this.khoaHoc = khoaHoc;
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
    this.dtb = 0;
    // Phương thức 
    this.tinhDTB = function() {
        this.dtb = (this.diemToan + this.diemHoa + this.diemLy) / 3;
    }
}