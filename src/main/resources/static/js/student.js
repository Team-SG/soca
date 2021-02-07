/*
    2021.02.06
    최초 작성자 : PYE
    로그인, 로그아웃, 회원가입, 마이페이지 등
    회원의 공통적인 기능이 정의되는 JavaScript
 */

$(document).ready(function() {
    // [인증발송] 버튼 클릭 이벤트
    $("#btnSendAuth").click(function (event) {
        // 이메일을 입력하지 않고 [인증발송] 버튼을 눌렀을 경우
        if($("#registerEmail").val().length == 0) {
            alert("이메일을 입력해주세요.");
            return;
        }

        var param = $("#registerForm").serializeObject();
        callPostService("/checkDuplicateEmail", param, "callSendAuthEmail");
    });
});

function callSendAuthEmail(data) {
    // 이메일 중복 확인 후, 결과 값(data)이 true일 경우
    if(data == true) {
        // 이메일 전송 로직
        return;
    } else {
        alert('이미 사용 중인 이메일 주소 입니다.')
        return;
    }
}
