/*
    2021.02.06
    최초 작성자 : PYE
    로그인, 로그아웃, 회원가입, 마이페이지 등
    회원의 공통적인 기능이 정의되는 JavaScript
 */

$(document).ready(function() {

    // 회원가입 폼 초기화하기
    $("#btnHRegister").click(function(event){
        initRegisterForm();
    });

    // 로그인 폼 초기화
    initLoginForm();

    // 약관동의를 체크했을 때
    $("#checkAgreement").click(function(event){
        if(document.getElementById("checkAgreement").checked==true){
            $("#btnNext").removeAttr("disabled");
        }
        else{
            $("#btnNext").attr("disabled", true);
        }

    });

    // [다음]버튼을 눌렀을 떄
    $("#btnNext").click(function(event){
        $("#btnAgreementClose").trigger("click");
    })

    // [인증발송] 버튼 클릭 이벤트
    $("#btnSendAuth").click(function (event) {
        sendAuthEmail();
    });

    //인증번호 [확인]버튼을 클릭했을 때
    $("#btnAuthCodeCheck").click(function (event) {
        checkAuthCode(1);
    });

    // 인증 번호를 수정했을 때
    $("#registerAuthCode").change(function (event){
        changeAuthCode();
    });

    // 비밀번호 focusout 이벤트 발생 (영+숫+특 체크)
    $("#registerPassword").focusout(function (event) {
        checkPasswordFirst(1);
    });

    // 비밀번호확인 focusout 이벤트 발생 (password1과 password2가 같은지 체크)
    $("#registerPasswordCheck").focusout(function (event) {
        checkPasswordSecond(1);
    });

    // 닉네임 [중복확인] 버튼 클릭 이벤트
    $("#btnNicknameCheck").click(function () {
        checkDuplicateNickname();
    });

    // 비밀번호 최초 작성 후 다시 수정이 이루어지는 경우
    $("#registerPassword").change(function (event) {
        changePassword(1);
    });

    // 닉네임 중복확인을 한번 한 상태에서 다시 닉네임을 변경할 경우
    $("#registerNickname").keydown(function(event){
        changeNickname(event);
    });


    //[초기화] 버튼을 눌렀을 때
    $("#btnReset").click(function(event){
       clear();
    });

    //회원가입 창을 닫았을 때
    $("#btnClose").click(function(event){
        document.getElementById("checkAgreement").checked=false;
        $("#btnNext").attr("disabled",true);
        clear();
    });

    //그냥 회원가입 창을 벗어났을떄
    $(document).click(function(event){
        if($("#agreement").is(event.target)){
            document.getElementById("checkAgreement").checked=false;
            $("#btnNext").attr("disabled",true);
        }
        if($("#register").is(event.target)){
            document.getElementById("checkAgreement").checked=false;
            $("#btnNext").attr("disabled",true);
            clear();
        }
    });

    //[가입하기] 버튼을 눌렀을 때
    $("#btnSubmit").click(function(event) {
        register();
    });

    // [로그인] 버튼 클릭 이벤트
    $("#btnLogin").click(function(event) {
        login();
    });

    // [로그인] 에서 X 버튼 클릭 이벤트
    $("#btnLoginClose").click(function(event) {
        $("#loginForm").each(function(){
            this.reset();
        });
        // 인증번호 입력 칸 사라지게.
        $("#loginAuthCode").attr("type", "hidden");
        $("#btnLoginAuthCheck").hide();
    });

    //바깥 클릭시
    $(document).click(function(event){
        if($("#login").is(event.target)){
            $("#loginForm").each(function(){
                this.reset();
            });
            $("#loginAuthCode").attr("type", "hidden");
            $("#btnLoginAuthCheck").hide();
        }
    });

    // [로그아웃] 버튼 클릭 이벤트
    $("#btnHLogout").click(function(event) {
        callPostService("/logout", null, function(data){
            window.location.reload(true);
        });
    });

    // 회원정보 찾기 클릭 이벤트
    $("#btnSearchInfo").click(function(event) {
       searchInfo();
    });

    // 회원정보 찾기 클릭 후 인증번호 확인 클릭 시 이벤트
    $("#btnLoginAuthCheck").click(function() {
       loginAuthCheck();
    });

    //==================== 마이페이지 관련================================

    // 마이페이지 초기화
    initMyPage();


    //비밃번호 변경 폼 초기화
    $("#btnPasswordChange").click(function(event){
        initPasswordChange();
        passwordChangeClear();
    })


    // 비밀번호 focusout 이벤트 발생 (영+숫+특 체크)
    $("#changePassword").focusout(function (event) {
        checkPasswordFirst(2);
    });

    // 비밀번호확인 focusout 이벤트 발생 (password1과 password2가 같은지 체크)
    $("#changePasswordCheck").focusout(function (event) {
        checkPasswordSecond(2);
    });


    // 비밀번호 최초 작성 후 다시 수정이 이루어지는 경우
    $("#changePassword").change(function (event) {
        changePassword(2);
    });

    //패스워드 [변경하기] 버튼을 눌렀을 때
    $("#btnPasswordChangeSubmit").click(function(){
        passwordChange();
    });

    //마이페이지에서 이메일을 변경 시도할 때
    $("#btnChangeEmail").click(function(event){
        emailChange();
    });

    //마이페이지에서 이메일 변경을 위해 인증번호 전송을 누르는 경우
    $("#btnMySendAuth").click(function(event){
        sendAuthMyEmail();
    });

    //마이페이지애서 닉네임을 변경하고자 할 때
    $("#btnChangeNickname").click(function(event){
        nicknameChange();
    });

    //마이페이지에서 닉네임 중복확인을 할 떄
    $("#btnMyNicknameCheck").click(function(event){
        checkDuplicateMyNickname();
    });

    //마이페이지에서 인증번호를 확인
    $("#btnMyAuthCodeCheck").click(function(event){
        checkAuthCode(2);
    });

    //마이페이지 변경내용을 취소할 때
    $("#btnMyPageCancel").click(function(event){
        window.location.reload();
    });

    //마이페이지 변경내용을 저장할 때
    $("#btnMyPageSave").click(function(event){
       saveMyPageChange();
    });

    $("#btnAsk").click(function(){
        if($("#askText").val().length === 0) {
            swal("내용을 입력해주세요.");
            return;
        }
        else {
            callPostService('sendAsk', $("#askText").val(), null);
            swal("정상적으로 전송되었습니다.").then(function() {
                location.href = "/myPage";
            })
        }
    })

    $("#btnAskClose").click(function(){
        $("#askForm").each(function(){
            this.reset();
        });
    })

    $(document).click(function(event){
        if($("#ask").is(event.target)){
            $("#askForm").each(function(){
                this.reset();
            });
        }
    });
});


// ================================ Custom Function ================================

function initLoginForm() {
    $("#btnLoginAuthCheck").hide();
}

// 로그인
function login() {
    if($("#loginEmail").val().length == 0) {
        swal("이메일을 입력해주세요.");
        return;
    }
    if($("#loginPassword").val().length == 0) {
        swal("비밀번호를 입력해주세요.");
        return;
    }

    var param = {
        email : $("#loginEmail").val(),
        password : $("#loginPassword").val()
    };
    callPostService("/login", param, function(data) {
        if(data.status == -1) {
            swal(data.msg);
            return;
        }
        else {
            window.location.replace("/");
        }
    });
}

// 회원가입 폼 초기화
function initRegisterForm() {
    // invalid한 패스워드 입력 전에는 숨김
    document.getElementById("checkAgreement").checked=false;
    $("#btnNext").attr("disabled",true);
    $("#passwordFail").hide();
    $("#passwordCheckFail").hide();
    $("#validAuthCode").hide();
    $("#validNickname").hide();
}

// 회원가입 폼 내용 초기화 함수
function clear(){
    $("#registerForm").each(function(){
        this.reset();
    });

    document.getElementById("checkAgreement").checked=false;

    $("#emailAuth").val(0);
    $("#emailCheckAuth").val(0);
    $("#passwordAuth").val(0);
    $("#passwordCheckAuth").val(0);
    $("#nicknameAuth").val(0);


    $("#passwordFail").hide();
    $("#passwordCheckFail").hide();
    $("#validAuthCode").hide();
    $("#btnAuthCodeCheck").show();
    $("#validNickname").hide();
    $("#btnNicknameCheck").show();
}

// 이메일 중복 체크 후 사용자가 입력한 이메일 주소로 인증번호 발송
function sendAuthEmail() {
    // 이메일을 입력하지 않고 [인증발송] 버튼을 눌렀을 경우
    if($("#registerEmail").val().length == 0) {
        swal("이메일을 입력해주세요.");
        return;
    }
    var param = {
        email : $("#registerEmail").val()
    };
    callPostService("/sendAuthEmail", param, "callSendAuthEmail");
}

// 인증번호를 체크하는 함수
function checkAuthCode(flag){
    //1: 회원가입, 2: 마이페이지
    if(flag==1){
        // 인증번호를 입력하지 않고 [확인] 버튼을 눌렀을 경우
        if($("#registerAuthCode").val().length == 0){
            swal("인증번호를 입력해주세요.");
            return;
        }

        var param = {
            AuthCode : $("#registerAuthCode").val()
        };
        callPostService("/checkAuthCode", param, "callAuthCode");
    }
    else if(flag==2){
        // 인증번호를 입력하지 않고 [확인] 버튼을 눌렀을 경우
        if($("#myAuthCode").val().length == 0){
            swal("인증번호를 입력해주세요.");
            return;
        }

        var param = {
            AuthCode : $("#myAuthCode").val()
        };
        callPostService("/checkAuthCode", param, "callMyAuthCode");
    }

}

// 인증완료이후 인증번호를 수정하려고 할 떄
function changeAuthCode(){
    $("#emailCheckAuth").val(0);
    $("#btnAuthCodeCheck").show();
    $("#validAuthCode").hide();
}


// 닉네임 중복 체크
function checkDuplicateNickname() {
    // 닉네임을 입력하지 않고 [중복확인] 버튼을 눌렀을 경우
    if($("#registerNickname").val().length == 0) {
        swal("닉네임을 입력해주세요.");
        return;
    }

    var param = {
        nickname : $("#registerNickname").val()
    };
    callPostService("/checkDuplicateNickname", param, "callDuplicateNickname");
}

// 패스워드 유효성 체크(영+숫+특)
function checkPasswordFirst(flag) {
    // 1: 회원가입 2: 비밀번호 변경
    // 영문+숫자+특수문자 조합 8자~20자를 충족하지 못하는 경우
    if(flag==1) {
        if (checkPasswordCondition($("#registerPassword").val()) === false) {
            $("#registerPassword").val(null);
            $("#passwordFail").show();
            $("#passwordAuth").val(0);
            return;
        } else {
            $("#passwordFail").hide();
            $("#passwordAuth").val(1);
            return;
        }
    }
    else if(flag==2){
        if (checkPasswordCondition($("#changePassword").val()) === false) {
            $("#changePassword").val(null);
            $("#changePasswordFail").show();
            $("#changePasswordAuth").val(0);
            return;
        } else {
            $("#changePasswordFail").hide();
            $("#changePasswordAuth").val(1);
            return;
        }
    }


}

// 패스워드 유효성 체크(password1과 password2가 같은지 체크)
function checkPasswordSecond(flag) {
    // 1: 회원가입 2: 비밀번호 변경
    // password와 패스워드 확인이 일치하지 않는 경우
    if(flag==1){
        if(Object.is($("#registerPassword").val(),$("#registerPasswordCheck").val())===false) {
            $("#registerPasswordCheck").val(null);
            $("#passwordCheckFail").show();
            $("#passwordCheckAuth").val(0);
            return;
        }
        else{
            $("#passwordCheckFail").hide();
            $("#passwordCheckAuth").val(1);
            return;
        }
    }
    else if(flag==2){
        if(Object.is($("#changePassword").val(),$("#changePasswordCheck").val())===false) {
            $("#changePasswordCheck").val(null);
            $("#changePasswordCheckFail").show();
            $("#changePasswordCheckAuth").val(0);
            return;
        }
        else{
            $("#changePasswordCheckFail").hide();
            $("#changePasswordCheckAuth").val(1);
            return;
        }
    }

}

// 패스워드를 변경한 경우
function changePassword(flag) {
    // 1: 회원가입 2: 비밀번호 변경
    if(flag==1){
        if ($("#registerPassword").val().length != 0 && $("#registerPasswordCheck").val().length != 0) {
            $("#registerPasswordCheck").val(null);
            $("#passwordCheckFail").show();
        } else {
            $("#registerPasswordCheck").focus();
            $("#passwordCheckFail").hide();
        }
    }
    else if(flag==2){
        if ($("#changePassword").val().length != 0 && $("#changePasswordCheck").val().length != 0) {
            $("#changePasswordCheck").val(null);
            $("#changePasswordCheckFail").show();
        } else {
            $("#changePasswordCheck").focus();
            $("#changePasswordCheckFail").hide();
        }
    }


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
        if( english === 0 || number === 0 || character === 0) return false;
        else return true;
    }
}

// 닉네임을 변경한 경우
function changeNickname(event) {
    if(event.keyCode<37 || event.keyCode>40) {
        $("#validNickname").hide();
        $("#btnNicknameCheck").show();
        $("#nicknameAuth").val("0");
        return;
    }
}

// 회원가입을 시도하는 경우
function register() {
    var email = $("#emailAuth").val();                 //인증 번호를 발송 했는지 여부
    var emailCheck = $("#emailCheckAuth").val();        //인증번호를 확인했는지 여부
    var password = $("#passwordAuth").val();           //패스워드가 조건을 만족하는지 여부
    var passwordCheck = $("#passwordCheckAuth").val(); //패스워드가 일치하는지 여부
    var nickname = $("#nicknameAuth").val();           //닉네임 중복확인을 통과했는지 여부


   if(email==="0"){
         if($("#registerEmail").val().length===0){
             swal("이메일을 입력해주세요.");
             $("#registerEmail").focus();
         }
         else{
             swal("인증번호를 발송하세요.");
             $("#btnSendAuth").focus();
         }
     }
    else if(emailCheck==="0"){
         if($("#registerAuthCode").val().length===0){
             swal("인증번호를 입력해주세요.");
             $("#registerAuthCode").focus();
         }
         else {
             swal("인증번호를 확인해주세요.");
             $("#btnAuthCodeCheck").focus();
         }
     }
    else if(password==="0"){
        swal("패스워드를 올바르게 입력해주세요.");
        $("#registerPassword").focus();
    }
    else if(passwordCheck==="0"){
        swal("패스워드가 일치하지 않습니다.");
        $("#registerPasswordCheck").focus();
    }
    else if(nickname==="0"){
        if($("#registerNickname").val().length==0){
            swal("닉네임울 입력해 해주세요.");
            $("#registerNickname").focus();
        }
        else{
            swal("닉네임 중복확인을 해주세요.");
            $("#btnNicknameCheck").focus();
        }

    }

    else{
        var param={
          email : $("#registerEmail").val(),
          password : $("#registerPassword").val(),
          nickname : $("#registerNickname").val(),
          useYN : "Y"
        };
        callPostService("/register",param,null);

        swal("회원가입이 완료 되었습니다!");
        $("#btnClose").trigger("click");

    }
}

//============================ 마이페이지 관련 function=========================

//마이페이지를 초기화
function initMyPage(){
    $("#btnMySendAuth").hide();
    $("#myAuthCode").hide();
    $("#btnMyAuthCodeCheck").hide();
    $("#myValidAuthCode").hide();
    $("#myEmailAuth").val(0);
    $("#myEmailCheckAuth").val(0);
    $("#btnMyNicknameCheck").hide();
    $("#myAuthCode").val(null);
    $("#myValidNickname").hide();
    $("#myNicknameAuth").val(0);
    $("#btnMyPageSave").attr("disabled",true);
    $("#btnMyPageCancel").attr("disabled",true);
}

// 비밀번호 변경을 초기화
function initPasswordChange(){
    $("#changePasswordFail").hide();
    $("#changePasswordCheckFail").hide();

}

// 비밀번호 변경 clear
function passwordChangeClear(){
    $("#currentPassword").val(null);
    $("#changePassword").val(null);
    $("#changePasswordCheck").val(null);
    $("#changePasswordAuth").val(0);
    $("#changePasswordCheckAuth").val(0);
}

//비밀번호 변경하기
function passwordChange(){
    var password1=$("#changePasswordAuth").val();
    var password2=$("#changePasswordCheckAuth").val();

    if($("#currentPassword").val().length==0){
        swal("현재 비밀번호를 입력해주세요.");
    }else if(password1==0){
        swal("새 패스워드를 올바르게 입력하세요.")
    }else if(password2==0){
        swal("새 패스워드가 일치하지 않습니다.")
    }
    else{
        var param={
            currentPassword: $("#currentPassword").val(),
            password: $("#changePassword").val()
        }
        callPostService("/passwordChange",param, "callPasswordChange");
    }

}

//email 변경하기
function emailChange(){
    $("#btnChangeEmail").hide();
    $("#btnMySendAuth").show();
    $("#myPageEmail").attr("readonly",false);
    $("#myPageEmail").val(null);
    $("#btnMyPageSave").removeAttr("disabled");
    $("#btnMyPageCancel").removeAttr("disabled");
    $("#myEmailAuth").val(-1);
    $("#myEmailCheckAuth").val(-1);
}

// 이메일 중복 체크 후 사용자가 입력한 이메일 주소로 인증번호 발송
function sendAuthMyEmail() {
    // 이메일을 입력하지 않고 [인증발송] 버튼을 눌렀을 경우
    if($("#myPageEmail").val().length == 0) {
        swal("이메일을 입력해주세요.");
        return;
    }

    var param = {
        email : $("#myPageEmail").val()
    };
    callPostService("/sendAuthMyEmail", param, "callSendAuthMyEmail");
}

//닉네임 변경하기
function nicknameChange(){
    $("#btnChangeNickname").hide();
    $("#btnMyNicknameCheck").show();
    $("#myPageNickname").attr("readonly",false);
    $("#myPageNickname").val(null);
    $("#btnMyPageSave").removeAttr("disabled");
    $("#btnMyPageCancel").removeAttr("disabled");
    $("#myNicknameAuth").val(-1);
}

// 마이페이지 닉네임 중복 체크
function checkDuplicateMyNickname() {
    // 닉네임을 입력하지 않고 [중복확인] 버튼을 눌렀을 경우
    if($("#myPageNickname").val().length == 0) {
        swal("닉네임을 입력해주세요.");
        return;
    }

    var param = {
        nickname : $("#myPageNickname").val()
    };
    callPostService("/checkDuplicateNickname", param, "callDuplicateMyNickname");
}

// 마이페이지 변경사항을 저장하는 함수
function saveMyPageChange(){
    var authCodeSend=$("#myEmailAuth").val();
    var authCodeCheck=$("#myEmailCheckAuth").val();
    var nicknameCheck=$("#myNicknameAuth").val();


    if(authCodeSend==0&&nicknameCheck==0) {
        swal("변경사항이 없습니다.");
        return;
    }
    if(authCodeSend<0){
        swal("인증번호를 발송 하십시오.");
        return;
    }
    if(authCodeSend>0){
        if(authCodeCheck<0){
            swal("인증번호를 확인해 주십시오.");
            return;
        }
    }
    if(nicknameCheck<0){
        swal("닉네임 증복확인을 해주세요.");
        return;
    }

   // swal("여기까지 통과");

    var param={
        email: $("#myPageEmail").val(),
        nickname: $("#myPageNickname").val()
    }
    callPostService("/changeMyPage",param,null);
    window.location.reload();
}



// ================================ Callback Function ================================

// 회원가입 이메일 중복 확인 콜백
function callSendAuthEmail(data) {
    swal(data.msg);
    if(data.status==1) $("#emailAuth").val(1);
}

// 인증번호 동일여부 확인 콜백
function callAuthCode(data){
    if(data==true){
        swal('인증번호가 확인되었습니다.');
        $("#btnAuthCodeCheck").hide();
        $("#validAuthCode").show();
        $("#emailCheckAuth").val(1);
        return;
    } else {
        swal('인증번호가 일치하지 않습니다.');
        $("#registerAuthCode").val(null);
        $("#emailCheckAuth").val(0);
        return;
    }

}

// 회원가입 닉네임 중복 확인 콜백
function callDuplicateNickname(data) {
    // 닉네임 중복 확인 후, 결과 값(data)이 true일 경우
    if(data === true) {
        swal("'"+$("#registerNickname").val()+"' 은(는) 사용 가능한 닉네임입니다.");

        //[중복확인] 버튼이 사라지고 체크 표시 그림이 나타나는 것도 괜찮을 듯
        $("#btnNicknameCheck").hide();
        $("#validNickname").show();
        $("#nicknameAuth").val(1);
        return;
    } else {
        swal('이미 사용중인 닉네임 입니다.');
        $("#registerNickname").val(null);
        $("#nicknameAuth").val(0);
        return;
    }
}

// 마이페이지 비밀번호 변경
function callPasswordChange(data){
    swal(data.msg);
    if(data.status>0)
        $("#btnPassChangeClose").trigger("click");
    else
        passwordChangeClear();

}

// 회원가입 이메일 중복 확인 콜백
function callSendAuthMyEmail(data) {
    swal(data.msg);
    if(data.status==1) {
        $("#myEmailAuth").val(1);
        $("#btnMySendAuth").hide();
        $("#myAuthCode").show();
        $("#btnMyAuthCodeCheck").show();
    }
}

//마이페이지 인증번호 확인 콜백
function callMyAuthCode(data){
    if(data==true){
        swal('인증번호가 확인되었습니다.');
        $("#btnMyAuthCodeCheck").hide();
        $("#myValidAuthCode").show();
        $("#myEmailCheckAuth").val(1);
        $("#myPageEmail").attr("readonly",true);
        $("#myAuthCode").hide();
        return;
    } else {
        swal('인증번호가 일치하지 않습니다.');
        $("#myAuthCode").val(null);
        $("#myEmailCheckAuth").val(-1);
        return;
    }

}

// 마이페이지 닉네임 중복 확인 콜백
function callDuplicateMyNickname(data) {
    // 닉네임 중복 확인 후, 결과 값(data)이 true일 경우
    if(data === true) {
        swal("'"+$("#myPageNickname").val()+"' 은(는) 사용 가능한 닉네임입니다.");

        //[중복확인] 버튼이 사라지고 체크 표시 그림이 나타나는 것도 괜찮을 듯
        $("#btnMyNicknameCheck").hide();
        $("#myValidNickname").show();
        $("#myNicknameAuth").val(1);
        $("#myPageNickname").attr("readonly",true);
        return;
    } else {
        swal('이미 사용중인 닉네임 입니다.');
        $("#myPageNickname").val(null);
        $("#myNicknameAuth").val(-1);
        return;
    }
}


// 회원 정보 찾기
function searchInfo() {

    if($("#loginEmail").val().length == 0) {
        swal("이메일을 입력해주세요.");
        return;
    }

    var param = {
        email : $("#loginEmail").val()
    };

    callPostService("/checkStudentInfo", param , function(data) {
        swal(data.msg);
        if(data.status == 1) {
            $("#loginAuthCode").attr("type", "text");
            $("#btnLoginAuthCheck").show();
        }
    });
}

// 인증번호 입력 후 임시 비밀번호 발급
function loginAuthCheck() {
    var param = {
        authCode : $("#loginAuthCode").val(),
        email : $("#loginEmail").val()
    };

    callPostService("loginAuthCheck", param, function(data) {
        swal(data.msg);
    })
}