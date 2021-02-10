/*
    2021.02.06
    최초 작성자 : PYE
    로그인, 로그아웃, 회원가입, 마이페이지 등
    회원의 공통적인 기능이 정의되는 JavaScript
 */

$(document).ready(function() {

    // invalid한 패스워드 입력 전에는 숨김
    $("#passwordFail").hide();
    $("#passwordCheckFail").hide();

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
    $("#registerPassword").focusout(function (event) {
        // 영문+숫자+특수문자 조합 8자~20자를 충족하지 못하는 경우
        if(checkPasswordCondition($("#registerPassword").val())===false) {
            $("#registerPassword").val(null);
            $("#registerPassword").focus();
            $("#passwordFail").show();
            return;
        }
        else{
            $("#passwordFail").hide();
            return;
        }
    });

    // 비밀번호확인 focusout 이벤트 발생
    $("#registerPasswordCheck").focusout(function (event) {
        // password와 패스워드 확인이 일치하지 않는 경우
        if(Object.is($("#registerPassword").val(),$("#registerPasswordCheck").val())===false) {
            $("#registerPasswordCheck").val(null);
            $("#passwordCheckFail").show();
            return;
        }
        else{
            $("#passwordCheckFail").hide();
            return;
        }
    });

    // 비밀번호 최초 작성 후 다시 수정이 이루어지는 경우에
    $("#registerPassword").keydown(function (event) {
        if($("#registerPasswordCheck").val().length != 0){
            $("#registerPasswordCheck").val(null);
            $("#passwordCheckFail").show();
        }
    });

    // [중복확인] 버튼 클릭 이벤트
    $("#btnNicknameCheck").click(function (event) {
        // 닉네임을 입력하지 않고 [중복확인] 버튼을 눌렀을 경우
        if($("#registerNickname").val().length == 0) {
            swal("닉네임을 입력해주세요.");
            return;
        }

        var param = {
            nickname : $("#registerNickname").val()
        };
        callPostService("/checkDuplicateNickname", param, "callDuplicateNickname");
    });

    //중복확인을 한번 한 상태에서 다시 닉네임을 바꾸려고 할 때
    $("#registerNickname").keydown(function(event){
       $("#btnNicknameCheck").removeAttr("disabled");
       //확인이 안 된 걸로 해야함
        return;
    });

});

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
        if( english === 0 || number === 0 || character === 0) return false;
        else return true;
    }
}

// 이메일 중복 확인 콜백
function callSendAuthEmail(data) {
    swal(data.msg);
}

// 닉네임 중복 확인 콜백
function callDuplicateNickname(data) {
    // 닉네임 중복 확인 후, 결과 값(data)이 true일 경우
    if(data === true) {
        swal("'"+$("#registerNickname").val()+"' 은(는) 사용할 수 있는 닉네임입니다.");
        //[중복확인] 버튼을 비활성화
        //[중복확인] 버튼이 사라지고 체크 표시 그림이 나타나는 것도 괜찮을 듯
        $("#btnNicknameCheck").attr("disabled","disabled");
        return;
    } else {
        swal('이미 사용중인 닉네임 입니다')
        $("#registerNickname").val(null);
        return;
    }
}