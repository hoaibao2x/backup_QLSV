 /** 
  * Chứa các hàm xử lý tương tác UI 
  * */

 // Global variable
 // Mảng SV và các chức năng của DanhSachSinhVien sẽ dùng cho toàn ứng dụng
 // => dssv thể hiện của DanhSachSinhVien là biến toàn cục
 var dssv = new DanhSachSinhVien();
 var validation = new Validation();

 // Hàm rút gọn cú pháp getElementById
 function getELE(id) {
     return document.getElementById(id);
 }

 //  Tạo localStorage
 function setLocalStorage() {
     // localStorage: Đối tượng có sẵn của js giúp thao tác về localstorage của browser
     // JSON: Đối tượng có sẵn của Js giúp chuỗi JSON
     // Dữ liệu lưu trữ ở localStorage là kiểu JSON
     // Chuyển từ Array => JSON

     // Khi mangSV thay đổi => Gọi hàm setLocalStorage để cập nhật cho local
     localStorage.setItem('DSSV', JSON.stringify(dssv.mangSV));
 }

 // Lấy localStorage
 function getLocalStorage() {
     // getItem => trả về dữ liệu JSON
     // JSON => Array
     //  localStorage chỉ lưu ở trình duyệt đang chạy ứng dụng
     //! => Nếu không kiểm tra (Nếu không có localStorage) => mangSV sẽ bị gán giá trị undefined => mangSV bị đổi kiểu dữ liệu sang undefined => Không dùng được các chức năng của Array
     if (localStorage.getItem('DSSV') != undefined) {
         dssv.mangSV = JSON.parse(localStorage.getItem('DSSV'));
     }

     hienThiDS(dssv.mangSV);
 }
 getLocalStorage();

 // Thêm sinh viên
 function themSinhVien() {
     var maSV = getELE('txtMaSV').value;
     var tenSV = getELE('txtTenSV').value;
     var email = getELE('txtEmail').value;
     var password = getELE('txtPass').value;
     var ngaySinh = getELE('txtNgaySinh').value;
     var khoaHoc = getELE('khSV').value;
     var diemToan = getELE('txtDiemToan').value;
     var diemLy = getELE('txtDiemLy').value;
     var diemHoa = getELE('txtDiemHoa').value;

     console.log(maSV, tenSV, email, password, ngaySinh, khoaHoc, diemToan, diemLy, diemHoa);

     var isValid = true;
     //?  Các bước kiểm tra dữ liệu
     /** 
      * Issue: Tên sv có value, mã sv không có value => Vẫn cho thêm sinh viên 
      * 
      * Expected: Chỉ được thêm sv khi tất cả các dữ liệu hợp lệ.
      * Nếu có 1 dữ liệu không hợp lệ => Thông báo + Không được thêm sv
      * 
      * Root Cause: Do dấu = (gán) => Chỉ giữ lại kt kết quả cuối cùng, các kết quả trước bị ghi đè mất
      * 
      * Solution:
      * C1: && => checkMa && checkTen => false & true => false
      * => Khó đọc khi chỉnh sửa
      * C2: Tách các bước kiểm tra => Dễ đọc code
      *   &: Tính toán binary (010101), true 1, false 0
      *     => checkMa & checkTen => 0 & 1 => 0
      * isValid(Cuối cùng) = isValid & checkEmpty
      * => isValid(Cuối cùng) &= checkEmpty
      * 
      * */
     // Mã SV (Kiểm tra rỗng, không được trùng)
     isValid &= validation.checkEmpty(maSV, "spanMaSV", "Mã sinh viên không được để trống !") && validation.checkID(maSV, "spanMaSV", "Mã sinh viên không được trùng !", dssv.mangSV);

     //  Tên SV (Kiểm tra rỗng, kiểm tra ký tự chữ)
     isValid &= validation.checkEmpty(tenSV, "spanTenSV", "Tên sinh viên không được để trống !") && validation.checkName(tenSV, "spanTenSV", "Tên sinh viên chỉ được chứa ký tự chữ !");

     // Email (Kiểm tra rỗng, kiểm tra định dạng)
     isValid &= validation.checkEmpty(email, "spanEmailSV", "Email không được để trống !") && validation.checkMail(email, "spanEmailSV", "Email không đúng định dạng !");

     // Password (Kiểm tra rỗng, kiểm tra định dạng)
     isValid &= validation.checkEmpty(password, "spanMatKhau", "Mật khẩu không được để trống") && validation.checkPassword(password, "spanMatKhau", "Mật khẩu cần ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt, độ dài từ 6 - 8 ký tự !");

     // Điểm Toán (Kiểm tra rỗng, kiểm tra định dạng điểm)
     isValid &= validation.checkEmpty(diemToan, "spanToan", "Điểm không được để trống !") && validation.checkScore(diemToan, "spanToan", "Điểm không đúng định dạng !");

     // Điểm Lý (Kiểm tra rỗng, kiểm tra định dạng điểm)
     isValid &= validation.checkEmpty(diemLy, "spanLy", "Điểm không được để trống !") && validation.checkScore(diemLy, "spanLy", "Điểm không đúng định dạng !");

     // Điểm Hóa (Kiểm tra rỗng, kiểm tra định dạng điểm)
     isValid &= validation.checkEmpty(diemHoa, "spanHoa", "Điểm không được để trống !") && validation.checkScore(diemHoa, "spanHoa", "Điểm không đúng định dạng !");

     // Khóa học (Người dùng có chọn các lựa chọn khác cái đầu tiên không)
     isValid &= validation.checkDropdown("khSV", "spanKhoaHoc", "Khóa học chưa được chọn !");

     if (isValid) {
         // Tất cả cữ liệu hợp lệ
         // Tạo thể hiện của SinhVien
         var sv = new SinhVien(maSV, tenSV, email, password, ngaySinh, khoaHoc, Number(diemToan), Number(diemLy), Number(diemHoa));
         sv.tinhDTB();
         console.log(sv);

         // Thêm sinh viên vào mangSV
         dssv.themSinhVien(sv);
         console.log(dssv.mangSV);

         // Gọi hàm hiển thị
         hienThiDS(dssv.mangSV);

         setLocalStorage();

         resetForm();
     }
 }

 /**
  * 
  * Input: mangSV
  * B1: Duyệt mảng để lấy ra từng đối tượng sinh viên
  * B2: Tạo hàng tr cho từng sinh viên
  * B3: Tạo từng td, đưa các thuộc tính của sinh viên đặt vào td
  * B4: Đem tất cả các thẻ tr lên hiển thị trên UI
  * 
  * Output: các thẻ <> để hiển thị lên html
  *  - 1 thẻ tr là 1 sv
  *  - Từng td là từng thuộc tính của sv
  */
 // Hiển thị danh sách sinh viên
 function hienThiDS(mangSV) {
     console.log('Mảng cần hiển thị', mangSV);
     //? map(): Hàm giúp duyệt mảng => Lấy ra từng phần tử của mảng (cú pháp ngắn gọn)
     //? ham1(ham2()) => callback function
     //? function() {} => hàm ẩn danh Anonymous function
     //? map(item: phần tử của mảng, index: vị trí của phần tử)
     // sau khi duyệt mảng => content = '<tr></tr><tr></tr>'

     //  ${}: Truyền biến vào cho chuỗi string template
     // Giá trị ban đầu
     var content = '';
     mangSV.map(function (sv) {
         //  console.log(sv);
         // string template (template literal)
         //  var trELE = ``;

         //  console.log(trELE);
         // content (sv1 + sv2) = content(sv1) + "<tr>sv2</tr>"
         //  content += trELE;

         content += `
         <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.khoaHoc}</td>
                <td>${sv.dtb}</td>
                <td>
                    <button class= "btn btn-info" onclick= "xemChiTiet('${sv.maSV}')">Xem</button>
                    <button class= "btn btn-danger" onclick= "xoaSinhVien('${sv.maSV}')">Xóa</button>
                </td>
            </tr>
        `;
     });

     //  console.log(content);
     getELE('tbodySinhVien').innerHTML = content;
 }


 /**
  * Xóa sv => xóa phần tử khỏi mảng
  * => Tìm được vị trí (index) của phần tử cần xóa
  * => Dựa vào maSV(trường dẽ liệu bắt buộc và duy nhất) => Để tìm kiếm sv
  */

 function xoaSinhVien(ma) {
     // console.log(ma);
     dssv.xoaSV(ma);
     hienThiDS(dssv.mangSV);
     setLocalStorage(dssv.mangSV);
 }


 /**
  * Cập nhật 
  * + Xem thông tin
  *  => Click button xem
  *  => Lấy thông tin của sv cần xem
  *  = > Hiển thị thông tin chi tiết của sv lên form
  *  
  * + Cập nhật
  *  => Edit thông tin cần sửa
  *  => Click button cập nhật
  *  => Lấy các giá trị từ form => Lưu vào đối tượng sv mới
  *  => Tìm vị trí sv cần cập nhật => Gán giá trị sv mới vào vị trí tìm thấy
  * */

 function xemChiTiet(ma) {
     // console.log("Xem",ma);
     var viTri = dssv.timViTri(ma);
     if (viTri > -1) {
         // Tìm thấy
         var svTim = dssv.mangSV[viTri];
         // console.log(svTim);
         getELE('txtMaSV').value = svTim.maSV;
         getELE('txtMaSV').disabled = true;
         getELE('txtTenSV').value = svTim.tenSV;
         getELE('txtEmail').value = svTim.email;
         getELE('txtPass').value = svTim.password;
         getELE('txtNgaySinh').value = svTim.ngaySinh;
         getELE('khSV').value = svTim.khoaHoc;
         getELE('txtDiemToan').value = svTim.diemToan;
         getELE('txtDiemLy').value = svTim.diemLy;
         getELE('txtDiemHoa').value = svTim.diemHoa;
     }
 }

 function capNhatSinhVien() {
     var maSV = getELE('txtMaSV').value;
     var tenSV = getELE('txtTenSV').value;
     var email = getELE('txtEmail').value;
     var password = getELE('txtPass').value;
     var ngaySinh = getELE('txtNgaySinh').value;
     var khoaHoc = getELE('khSV').value;
     var diemToan = getELE('txtDiemToan').value;
     var diemLy = getELE('txtDiemLy').value;
     var diemHoa = getELE('txtDiemHoa').value;

     console.log(maSV, tenSV, email, password, ngaySinh, khoaHoc, diemToan, diemLy, diemHoa);





     var isValid = true;

     // Mã SV (Kiểm tra rỗng, không được trùng)
    //  isValid &= validation.checkEmpty(maSV, "spanMaSV", "Mã sinh viên không được để trống !") && validation.checkID(maSV, "spanMaSV", "Mã sinh viên không được trùng !", dssv.mangSV);

     //  Tên SV (Kiểm tra rỗng, kiểm tra ký tự chữ)
     isValid &= validation.checkEmpty(tenSV, "spanTenSV", "Tên sinh viên không được để trống !") && validation.checkName(tenSV, "spanTenSV", "Tên sinh viên chỉ được chứa ký tự chữ !");

     // Email (Kiểm tra rỗng, kiểm tra định dạng)
     isValid &= validation.checkEmpty(email, "spanEmailSV", "Email không được để trống !") && validation.checkMail(email, "spanEmailSV", "Email không đúng định dạng !");

     // Password (Kiểm tra rỗng, kiểm tra định dạng)
     isValid &= validation.checkEmpty(password, "spanMatKhau", "Mật khẩu không được để trống") && validation.checkPassword(password, "spanMatKhau", "Mật khẩu cần ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt, độ dài từ 6 - 8 ký tự !");

     // Điểm Toán (Kiểm tra rỗng, kiểm tra định dạng điểm)
     isValid &= validation.checkEmpty(diemToan, "spanToan", "Điểm không được để trống !") && validation.checkScore(diemToan, "spanToan", "Điểm không đúng định dạng !");

     // Điểm Lý (Kiểm tra rỗng, kiểm tra định dạng điểm)
     isValid &= validation.checkEmpty(diemLy, "spanLy", "Điểm không được để trống !") && validation.checkScore(diemLy, "spanLy", "Điểm không đúng định dạng !");

     // Điểm Hóa (Kiểm tra rỗng, kiểm tra định dạng điểm)
     isValid &= validation.checkEmpty(diemHoa, "spanHoa", "Điểm không được để trống !") && validation.checkScore(diemHoa, "spanHoa", "Điểm không đúng định dạng !");

     // Khóa học (Người dùng có chọn các lựa chọn khác cái đầu tiên không)
     isValid &= validation.checkDropdown("khSV", "spanKhoaHoc", "Khóa học chưa được chọn !");

     if (isValid) {
         // Tạo thể hiện của SinhVien
         var sv = new SinhVien(maSV, tenSV, email, password, ngaySinh, khoaHoc, Number(diemToan), Number(diemLy), Number(diemHoa));
         sv.tinhDTB();
         console.log(sv);

         dssv.capNhatSinhVien(sv);
         hienThiDS(dssv.mangSV);
         setLocalStorage();

         resetForm();
     }
 }

 function resetForm() {
     // Chỉ dùng với thẻ form => clear các giá trị ở trên form giúp User nhập nội dung mới
     getELE('formQLSV').reset();
     getELE('txtMaSV').disabled = false;
 }

 function timKiemTheoTen() {
    var tuKhoa = getELE("txtSearch").value;

    var mangTK = dssv.timKiem(tuKhoa.trim());

    hienThiDS(mangTK);
 }

//  Tìm kiếm khi click button search
 getELE("btnSearch").onclick = timKiemTheoTen;

//  onekeypress (Khi người dùng đè phím), onekeydown (Khi người dùng mới nhấn phím), onekeyup (Khi người dùng nhấc ngón tay khỏi phím)
// => Chỉ nên dùng khi dữ liệu tìm kiếm ít, nên dùng với chức năng validation
getELE("txtSearch").onkeyup = timKiemTheoTen;