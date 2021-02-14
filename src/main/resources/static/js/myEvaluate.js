/*
    2021.02.14
    최초 작성자 : PYE
    평가방 - 나의강의평가 기능이 정의되는 JavaScript
 */

$(document).ready(function() {
    getYearSemester(); // 수강년도/학기 데이터 조회
});


// ================================ Custom Function ================================

// 수강년도 및 학기 데이터 가져오기
function getYearSemester() {
    callPostService('getYearSemester', null, 'callGetYearSemester')
}


// ================================ Callback Function ================================

// 수강년도 및 학기 데이터 가져오기 콜백
function callGetYearSemester(data) {
    // 수강년도/학기 리스트에 데이터 추가
    $.each(data, function(index, item) {
        console.log(item)
        var option = "<option>" + item.year + "년도 " + item.semester + "학기" + "</option>";
        $("#selectYear").append(option);
    });
}