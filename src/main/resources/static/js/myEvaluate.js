/*
    2021.02.14
    최초 작성자 : KDB
    평가방 - 나의강의평가 기능이 정의되는 JavaScript
 */

$(document).ready(function() {
    getYearSemester(); // 수강년도/학기 데이터 조회
    getSubjectList();
    $("#selectYear").change(function (event){
        $("#subjectList").empty();
        getSubjectList();
    })
});


// ================================ Custom Function ================================

// 수강년도 및 학기 데이터 가져오기
function getYearSemester() {
    callPostService('getYearSemester', null, 'callGetYearSemester')
}

// 해당 수강년도 및 학기에 대한 수강과목 데이터 가져오기
function getSubjectList(){
    var selectedYear=$("#selectYear").val();
    var start=selectedYear.indexOf("년도");
    var end=selectedYear.indexOf("학기");
    var year=selectedYear.substring(0,start);
    var semester=selectedYear.substring(start+3,end);

    var param={
        year : year,
        semester : semester
    }

    callPostService('/getSubjectList',param,"callGetSubjectList");
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

function callGetSubjectList(data){
    var start= '<li class="list-group-item d-flex justify-content-between align-items-center">';
    var last;
    $.each(data,function(index,item){
        if(isEvaluated(item.subjectID))
            last= '<span class="badge badge-dark fs-090"  onclick="location.href=\'/evaluateComplete?subjectID='+item.subjectID+'\'"  style="cursor:pointer">평가완료</span></li>';
        else
            last= '<span class="badge badge-primary fs-090"  onclick="location.href=\'/evaluateWrite?subjectID='+item.subjectID+'\'"  style="cursor:pointer">평가하기</span></li>';
        var prof="";
        if(item.professor!="") prof=tabChar()+" - "+item.professor +" 교수님";
        var li = start + "<div> <strong>["+item.code+"] </strong>"+ tabChar() ;
        if(isEvaluated(item.subjectID)) li += '<a style="color:#000000"  href="\evaluateComplete?subjectID=' + item.subjectID + '">' + item.subjectNO + prof + '</a>'
        else li += item.subjectNO+ prof
        li += "</div>" + last;
        $("#subjectList").append(li);
    })
}

function isEvaluated(subjectID){
    var result;
    var param={
        subjectID:subjectID
    }
    callPostService("/isEvaluated",param,function(data){
        result=data;
    });
    return result;
}
