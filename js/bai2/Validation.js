function Validation() {

    this.checkEmpty = function (inputVal, spanID, message) {
        // inputVal khác rỗng
        //? trim() Xóa khoảng trắng phía trước và sau chuỗi kí tự
        // "  ab  " => "  ab  ".trim() => "ab"
        // "  " => "  ".trim() => ""
        if (inputVal.trim() != '') {
            // Hợp lệ
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        // Không hợp lệ
        // Điền câu thông báo lên UI
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkID = function (inputVal, spanID, message, mangSV) {
        /** 
         * Duyệt mảng 
         *  So sánh mã của từng sv vs inputVal
         *  Nếu trùng => Thông báo lỗi => return false
         *  Ngược lại => Hợp lệ => return true
         * 
         * */

        // some() => Duyệt mảng, some(function(item(sv), index) {}), return true/ false
        // Giả sử mã chưa tồn tại
        var isExist = false;
        isExist = mangSV.some(function (sv, index) {
            // return kết quả của biểu thức so sánh
            return sv.maSV === inputVal.replaceAll(" ", "");
        });

        if (isExist) {
            // Mã bị trùng => Dữ liệu không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        } else {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }

    this.checkName = function (inputVal, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/

        if (inputVal.match(pattern)) {
            // Hợp lệ
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkMail = function (inputVal, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkPassword = function (inputVal, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/

        if (inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkScore = function (inputVal, spanID, message) {
        var pattern = /^(\d{1,2}(\.\d{1,2})?)$/

        if (inputVal.match(pattern) &&  inputVal <= 10) {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkDropdown = function(selectID, spanID, message) {
        var indexOption = document.getElementById(selectID).selectedIndex;

        if (indexOption != 0) {
            // Người dùng có chọn
            document.getElementById(spanID).innerHTML = "message";
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
}