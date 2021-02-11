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
    $("#validNickname").hide();

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
            $("#passwordAuth").val(0);

            return;
        }
        else{
            $("#passwordFail").hide();
            $("#passwordAuth").val(1);
            return;
        }
    });

    // 비밀번호확인 focusout 이벤트 발생
    $("#registerPasswordCheck").focusout(function (event) {
        // password와 패스워드 확인이 일치하지 않는 경우
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
    });

    // 비밀번호 최초 작성 후 다시 수정이 이루어지는 경우에
    $("#registerPassword").keydown(function (event) {
        if(event.keyCode<37 || event.keyCode>40) {
            if ($("#registerPassword").val().length != 0 && $("#registerPasswordCheck").val().length != 0) {
                $("#registerPasswordCheck").val(null);
                $("#passwordCheckFail").show();
            } else {
                $("#passwordCheckFail").hide();
            }
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
        $("#validNickname").hide();
        $("#btnNicknameCheck").show();
        $("#nicknameAuth").val("0");
        return;
    });

    //이걸 한번에 할 수 있는 방법이 있을까
    //[초기화] 버튼을 눌렀을 때
    $("#btnReset").click(function(event){
       $("#registerForm").each(function(){
          this.reset();
       });
        $("#passwordFail").hide();
        $("#passwordCheckFail").hide();
        $("#validNickname").hide();
        $("#btnNicknameCheck").show();
    });

    //회원가입 창을 닫았을 때
    $("#btnClose").click(function(event){
        $("#registerForm").each(function(){
            this.reset();
        });
        $("#passwordFail").hide();
        $("#passwordCheckFail").hide();
        $("#validNickname").hide();
        $("#btnNicknameCheck").show();
    });

    //[가입하기] 버튼을 눌렀을 때, 아직 작동 제대로 안됨
    $("#btnSubmit").click(function(event) {

        var email = $("#emailAuth").val();                 //인증 번호를 발송 했는지 여부
        var emailCheck = $("#emailCheckAuth").val();        //인증번호를 확인했는지 여부
        var password = $("#passwordAuth").val();           //패스워드가 조건을 만족하는지 여부
        var passwordCheck = $("#passwordCheckAuth").val(); //패스워드가 일치하는지 여부
        var nickname = $("#nicknameAuth").val();           //닉네임 중복확인을 통과했는지 여부


      /* if(email==="0"){
           if($("#registerEmail").val().length===0){
               swal("이메일을 입력해주세요.");
               $("#registerEmail").focus();
           }
           else{
               swal("인증번호를 발송하세요.");
               $("#btnSendAuth").focus();
           }
       }
       else if(emailCode==="0"){
           if($("#registerAuthCode").val().length===0){
               swal("인증번호를 입력해주세요.");
               $("#registerAuthCode").focus();
           }
           else {
               swal("인증번호를 확인해주세요.");
               //확인버튼에 focus
           }
       }
       else*/ if(password==="0"){
           swal("패스워드를 올바르게 입력해주세요.");
           $("#registerPassword").focus();
       }
       else if(passwordCheck==="0"){
           swal("패스워드가 일치하지 않습니다.");
           $("#registerPasswordCheck").focus();
       }
       else if(nickname==="0"){
           swal("닉네임 중복확인을 해주세요.");
           $("#registerNickname").focus();
       }

       //아직 얘가 작동 안함
       else{
           var param=$("#registerForm").serializeObject();
           callPostService("/register",param,function(data){
               if(data==true) swal("회원가입이 완료 되었습니다!");
               else swal("회원가입실패");
           });
       }

    });

    // Login Button
    $("#btnStudentLogin").click(function(event) {

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
    });

    $("#btnLoginClose").click(function(event) {
        $("#loginForm").each(function(){
            this.reset();
        });
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
        //$("#btnNicknameCheck").attr("disabled","disabled");
        $("#btnNicknameCheck").hide();
        $("#validNickname").show();
        $("#nicknameAuth").val(1);
        return;
    } else {
        swal('이미 사용중인 닉네임 입니다')
        $("#registerNickname").val(null);
        $("#nicknameAuth").val(0);
        return;
    }
}