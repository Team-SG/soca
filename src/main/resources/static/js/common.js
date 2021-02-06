/*
    2021.02.06
    최초 작성자 : PYE
    공통 함수가 정의되는 JavaScript
 */

// 서비스 호출
function callService(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "application/json",
        data: data,
        success: function(json) {
            alert(json);
        },
        error: function(error) {
            alert(error);
        }
    });
}

$(document).ready(function() {
    // 인증 발송 버튼 클릭
    $("#btnSendAuth").click(function (event) {
        var param = $("#registerForm").serialize();
        callService("/checkDuplicateEmail", param);
    });
});