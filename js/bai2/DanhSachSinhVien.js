/** 
 * Lưu trữ nhiều đối tượng sinh viên (Mảng sinh viên)
 * - Thêm sv (thêm phần tử mới cho mảng)
 * - Xóa, sửa (xóa, cập nhật thông tin phần tử trong mảng
 * - Tìm kiếm sinh viên theo điều kiện)
 * 
 *  */

function DanhSachSinhVien() {
    // Thuộc tính
    // Mảng các đối tượng sinh viên
    this.mangSV = [];
    // Phương thức
    // Truyền tham số là đối tượng sinh viên
    this.themSinhVien = function(sv) {
        this.mangSV.push(sv);
    }
    this.timViTri = function(ma) {
        // Giả sử viTri chưa tìm thấy nên = -1;
        // console.log(ma);
        var viTri = -1;
        // Duyệt mảng và so sánh mã để tìm sinh viên trong mảng
        this.mangSV.map(function(sv,index) {
            if (sv.maSV == ma) {
                // Tìm thấy
                viTri = index;
            }
            console.log(viTri);
        });

        // Trả kết quả vị trí tìm thấy ra khỏi hàm để sử dụng ở các hàm khác
        return viTri;
    }
    this.xoaSV = function (maSV) {
        var viTri = this.timViTri(maSV);
        // console.log(maSV, viTri);

        if (viTri > -1) {
            // Tìm thấy
            // splice(vị trí bắt đầu xóa, số lượng cần xóa tính từ vị trí bắt đầu)
            // splice(1, 3) => Xóa các phần tử có index 1, 2, 3
            this.mangSV.splice(viTri, 1);
        }
    }
    this.capNhatSinhVien = function(sv) {
        var viTri = this.timViTri(sv.maSV);
        if (viTri > -1) {
            // Tìm thấy
            dssv.mangSV[viTri] = sv;
        }
    }
}

/** 
 * Tìm kiếm theo tên 
 * Input: Từ khóa tìm kiếm (nguyen)
 * 
 * Các bước:
 *      Tạo biến mảng chứa kết quả tìm thấy
 *      mangTK[sv1, sv2, ...] => Khai báo mặc định var mangTK = []
 *      Duyệt mảng
 *          JS: phân biệt chữ hoa và thường của chuỗi string
 *          => không nên dùng so sánh bằng (===)
 *          tuKhoa: Nguyen => toLowCaseString() => nguyen
 *          Tên: NGUYEN van b => toLowCaseString() => nguyen van b
 * 
 *          nguyen === nguyen van b => Không tìm thấy do JS so sánh cả 1 cụm chuỗi ký tự
 *          => indexOf() => Tìm trong tên SV có chứa từ khóa tìm kiếm không
 *          => Có chứa thì trả về vị trí tìm thấy         
 *          if tuKhoa === sv.tenSV
 *              Lưu sv tìm thấy vào mangTK 
 * 
 * Output: Các sinh viên có từ khóa tìm kiếm
 * (nguyen van a, tran nguyen, NGUYEN van b)
 * 
 * */

// Khai báo phương thức tìm kiếm
// Prototype => ES5 => Tạo thuộc tính và phương thức mà không cần chỉnh sửa lớp đối tượng

DanhSachSinhVien.prototype.timKiem = function(tuKhoa) {
    var mangTK = [];
    // var tuKhoaThuong = tuKhoa.toLowerCase();
    this.mangSV.map(function(sv) {
        // var tenSVThuong = sv.tenSV.toLowerCase();
        // var viTriTimKiem = tenSVThuong.indexOf(tuKhoaThuong);

        var viTriTimKiem = sv.tenSV.toLowerCase().indexOf(tuKhoa.toLowerCase());

        if (viTriTimKiem !== -1) {
            // Tìm thấy
            mangTK.push(sv);
        }
    });

    return mangTK;
}