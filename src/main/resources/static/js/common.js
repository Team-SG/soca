/*
    2021.02.06
    최초 작성자 : PYE
    공통 함수가 정의되는 JavaScript
 */

// 서비스 호출
function callPostService(url, param, callBack) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),
        success: function(json) {
            console.log(json);
            // 실행 성공 후, 콜백 메서드 실행
            if(callBack != null) {
                eval(callBack)(json);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

// 폼 데이터 JSON 변환
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// tab 문자 구현
function tabChar(){
    return '<span class="tab">&#9;</span>';
}
