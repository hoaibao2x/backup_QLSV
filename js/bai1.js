/** Variable
 * 
 * number, string, boolean, array
 * 
 */

//! => Tạo rất nhiều biến, khó tìm kiếm, sắp xếp dữ liệu
// var ma = 'SV001';
// var ten = 'Trần Văn A';
// var toan = 7;
// var van = 9;

//! => Khi thêm, xóa, sửa dữ liệu phải xử lý trên nhiều mảng dữ liệu
// var ma = ['SV01', 'SV02'];
// var ten = ['Trần Văn A', 'Nguyễn B'];
// var toan = [10, 9];

//? Cần có kiểu diwx liệu giúp tổ chức lưu dữ liệu của 1 sinh viên rõ ràng 
//? Kiểu dữ liệu giúp tổ chức danh sách nhiều sinh viên mà chỉ cần dùng 1 biến mảng
//? => Đối tượng (Object)

// Khai báo đối tượng
// var sv1 = {
//     // Các thông tin cần lưu trữ của obj
//     // Thuộc tính (property)
//     id: 'SV001',
//     name: 'Trần Văn A',
//     toan: 9,
//     van: 7
// }

// var sv2 = {
//     id: 'SV002',
//     name: 'Nguyễn B',
//     toan: 6,
//     van: 8,
//     // Phương thức (method)
//     // this: Đại diện cho đối tượng sv2, giúp truy xuất đối tượng
//     // Gọi bên trong phuobgw thức của đối tượng
//     tinhDTB: function() {
//         return (this.toan + this.van)/2;
//     }
// }

// console.log(sv2);

// // Gọi bên ngoài đối tượng
// //? đối tượng.tên thuộc tính
// console.log(sv2.toan);
// console.log(sv2['toan']);
// // Gọi phương thức
// console.log(sv2.tinhDTB());

//! Khi muốn tạo thêm đối tượng sv mới thì phải khai báo lại các thuộc tính + phương thức => tốn nhiều code khai báo
// => Lớp đối tượng (Class)
// Chứa các thuộc tính + phương thức chung cho tất cả các đối tượng cùng loại (Sinh viên). Vd: Class SinhVien, Class NhanVien, Class SanPham


// Sử dụng lớp đối tượng => Tạo thể hiện của lớp (instance)
// var sv3 = new SinhVien('SV003', 'Đen Thị Giàu', 10, 9);
// console.table(sv3);
// console.log(sv3.tinhDTB2());

// var sv4 = new SinhVien('SV004', 'Đen Thị Nghèo', 6, 8);
// console.log(sv4);



/** Code thực hành bài luyện 1
 * 
 * - Tạo lớp đối tượng SinhVien => tạo nhanh các đối tượng 
 * - Lấy thông tin từ forn
 * - Lưu vào thuọc tính của lớp đối tượng để lưu trữ (tạo ra sinh viên mới -sv5)
 * - Đem các thông tin của sinh viên hiển thị theo yêu cầu
 * 
 * **/
//? Khai báo ES5 (function)
// Passcal Case (Viết hoa chữ cái đầu tiên)
function SinhVien(ma, name, diemToan, diemVan, loai) {
    // this: Đại diện cho lớp đối tượng SinhVien => Truy xuất được các thuộc tính (gọi thuộc tính)
    // Thuộc tính
    this.ma = ma;
    this.name = name;
    this.diemToan = diemToan;
    this.diemVan = diemVan;
    this.loai = loai;
    // Phương thức
    this.tinhDTB2 = function () {
        return (this.diemToan + this.diemVan) / 2;
    }
    this.xepLoai = function (dtb) {
        if (9 <= dtb && dtb <= 10) {
            return 'Giỏi';
        } else if (7 <= dtb && dtb < 9) {
            return 'Khá';
        } else if ( 0 <= dtb & dtb < 7) {
            return 'TB';
        } else {
            return 'Chưa xếp loại !';
        }
    }
}

function hienThiSinhVien() {
    var ma = document.querySelector('#txtMaSV').value;
    var name = document.querySelector('#txtTenSV').value;
    var diemToan = Number(document.querySelector('#txtDiemToan').value);
    var diemVan = Number(document.querySelector('#txtDiemVan').value);
    var loai = document.querySelector('#loaiSV').value;

    console.log(ma, name, diemToan, diemVan, loai);

    // Tạo thể hiện của lớp
    var sv5 = new SinhVien(ma, name, diemToan, diemVan, loai);
    console.log(sv5);
    console.log(sv5.tinhDTB2());

    // var dtbSV5 = sv5.tinhDTB2();
    // var loaiHL = sv5.xepLoai(dtbSV5);
    // console.log(loaiHL);

    // Callback function: 1 hàm nhận giá trị tham số từ 1 hàm khác
    // DK dùng: Hàm truyền có return, hàm nhận giá trị cần truyền giá trị vào tham số
    var loaiHL = sv5.xepLoai(sv5.tinhDTB2());
    // console.log(loaiHL);

    document.querySelector('#spanTenSV').innerHTML = sv5.name;
    document.querySelector('#spanMaSV').innerHTML = sv5.ma;
    document.querySelector('#spanLoaiSV').innerHTML = sv5.loai;
    document.querySelector('#spanDTB').innerHTML = sv5.tinhDTB2();
    // document.querySelector('#').innerHTML = loaiHL;
    document.querySelector('#spanXepLoai').innerHTML = sv5.xepLoai(sv5.tinhDTB2());

}
document.querySelector('.container-fluid .btn').onclick = hienThiSinhVien;