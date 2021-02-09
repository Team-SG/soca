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
            swal("이메일을 입력해주세요.");
            return;
        }
        var param = {
            email : $("#registerEmail").val()
        };
        callPostService("/sendAuthEmail", param, "callSendAuthEmail");
    });

    // 비밀번호 focusout 이벤트 발생
    $("#password").focusout(function (event) {
        // 영문+숫자+특수문자 조합 8자~20자를 충족하지 못하는 경우
        if(checkPasswordCondition($("#password").val())===false) {
            swal("패스워드는 영문+숫자+특수문자 조합 8자~20자이어야 합니다");
            return;
        }
    });

    // 비밀번호확인 focusout 이벤트 발생
    $("#passwordCheck").focusout(function (event) {
        // password와 패스워드 확인이 일치하지 않는 경우
        if(Object.is($("#password").val(),$("#passwordCheck").val())===false) {
            swal("패스워드가 일치하지 않습니다");
            return;
        }
    });

    // [중복확인] 버튼 클릭 이벤트
    $("#btnNicknameCheck").click(function (event) {
        // 닉네임을 입력하지 않고 [중복확인] 버튼을 눌렀을 경우
        if($("#nickname").val().length == 0) {
            swal("닉네임을 입력해주세요.");
            return;
        }

        // 여기가 동작이 제대로 안되는 중중
        // 여기서 ""가 자동으로 추가되는 것 같은데 없애야함
        var param = $("#nickname").val();
        callPostService("/checkDuplicateNickname", param, "callDuplicateNickname");
    });

    // [초기화] 버튼 클릭 이벤트
    $("#btnReset").click(function (event) {
        // 초기화를 눌렀을떄 모든 내용을 삭제
        // 한번에 할 수 있는 방법이 있을 것 같은데 찾아볼 예정
        $("#registerEmail").val(null);
        $("#emailCode").val(null);
        $("#password").val(null);
        $("#passwordCheck").val(null);
        $("#nickname").val(null);
        $("#studentID").val(null);
    });
});

function callSendAuthEmail(data) {
    swal(data.msg);
}

// 패스워드 유효성 체크
function checkPasswordCondition(password){
    // password가 8자 미만 20자 초과일 경우 false
    if( password.length < 8 || password.length > 20 ) return false;
    else {
        var english = 0,number = 0,character = 0;
        for( var i=0;i<password.length;i++){
            var passwordChar=password.charAt(i);
            if(('A'<= passwordChar && passwordChar <= 'Z') || ('a'<= passwordChar && passwordChar <= 'z'))
                english++;
            else if( '0'<= passwordChar && passwordChar <= '9')
                number++;
            else character++;
        }
        if( english ==0 || number ==0 || character == 0) return false;
        else return true;
    }
}

// 이메일 중복 확인 callBack
function callDuplicateNickname(data) {
    // 닉네임 중복 확인 후, 결과 값(data)이 true일 경우
    if(data == true) {
        swal("'"+$("#nickname").val()+"' 은(는) 사용할 수 있는 닉네임입니다.")
        return;
    } else {
        swal('이미 사용중인 닉네임 입니다')
        return;
    }
}