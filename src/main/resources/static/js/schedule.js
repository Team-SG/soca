/*
    2021.02.12
    최초 작성자 : PYE
    시간표 등록 / 수정 관련 기능이 정의되는 JavaScript
 */

const Grid = tui.Grid;
var schedule;
var subjectLists = [];
var selectSubject;

$(document).ready(function() {

    initGrid(); // 그리드 초기 세팅
    getYearSemester(); // 수강년도/학기 데이터 조회
    getMajor(); // 전공 데이터 조회
    getSubject(); // 수강 과목 조회
    loadSubjectList();//현재 학생의 수강과목 조회

    // [추가] 버튼 클릭 이벤트
    $("#btnInsert").click(function() {
        insertSchedule();
    });

    // [삭제] 버튼 클릭 이벤트
    $("#btnDelete").click(function() {
        // 그리드 선택된 항목 삭제
        deleteGridData();
    });

    // autoComplete 뜨게.
    $("#subject").autocomplete({
        source : function(request, response) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.map(subjectLists, function(item) {
                if (matcher.test(item.subjectNO)) {
                    var major = $("#selectMajor").val();
                    var result = {
                        label: item.subjectNO + " " + item.formatTime + " / " + item.professor,
                        value: item.subjectID,
                        subjectID: item.subjectID,
                        code: item.code,
                        major: item.major,
                        subjectNO: item.subjectNO,
                        time: item.formatTime,
                        credit: item.credit,
                        professor: item.professor
                    }
                    if(major == "전공") {
                        return result;
                    } else {
                        if(major == item.major) {
                            return result;
                        }
                    }
                }
            }));
        },
        select : function(event, ui) {
            event.preventDefault();
            $("#subject").val(ui.item.label);
            $("#subjectID").val(ui.item.value);
            selectSubject = ui.item;
            //alert(ui.item.value);
        }
    });

    $("#selectYear").change(function(){
        getMajor(); // 전공 데이터 조회
        getSubject();
        schedule.clear();
        loadSubjectList();
        //schedule.resetData(data);
    })
});

// ================================ Custom Function ================================

// 그리드 초기 세팅
function initGrid() {
    const data = [];

    schedule = new Grid({
        el: document.getElementById('grid'),
        data: data,
        rowHeaders: ['checkbox'],
        scrollY: false,
        columns: [
            {
                header: 'subjectID',
                name: 'subjectID',
                hidden: true
            },
            {
                header: '과목코드',
                width: 'auto',
                minWidth: '90',
                align: 'center',
                name: 'code'
            },
            {
                header: '학과',
                width: 'auto',
                minWidth: '230',
                name: 'major'
            },
            {
                header: '과목',
                width: 'auto',
                minWidth: '250',
                name: 'subjectNO'
            },
            {
                header: '시간',
                width: 'auto',
                minWidth: '150',
                align: 'center',
                name: 'time'
            },
            {
                header: '학점',
                width: 'auto',
                align: 'center',
                name: 'credit'
            },
            {
                header: '교수',
                width: 'auto',
                minWidth: '100',
                align: 'center',
                name: 'professor'
            }
        ]
    });

    schedule.resetData(data);
}

// ================================ Custom Function ================================

// 수강년도 및 학기 데이터 가져오기
function getYearSemester() {
    callPostService('getYearSemester', null, 'callGetYearSemester')
}

// 수강 과목 가져오기
function getSubject() {
    var param = {
        yearSemester : $("#selectYear option:selected").val()
    }
    callPostService("findSubjects", param, 'callGetSubject');
}

// 전공 가져오기
function getMajor() {
    var param = {
        yearSemester : $("#selectYear option:selected").val()
    }
    callPostService('getMajor', param, 'callGetMajor')
}

// 그리드 선택된 항목 삭제
function deleteGridData() {
    var checkedRows = schedule.getCheckedRows();
    /*for(var i=0; i<checkedRows.length; i++){
        schedule.removeRow(checkedRows);
    }*/
    schedule.removeCheckedRows(false);
    for(var i = 0; i < checkedRows.length; i++) {
        var param = {
            subject : checkedRows[i].subjectID
        }
        callPostService('deleteSchedule', param, null);
    }
}

function insertGridData() {
    var rowData = [
        {
            subjectID: selectSubject.subjectID,
            code: selectSubject.code,
            major: selectSubject.major,
            subjectNO: selectSubject.subjectNO,
            time: selectSubject.time,
            credit: selectSubject.credit,
            professor: selectSubject.professor
        }
    ];
    schedule.appendRows(rowData);
}

// Schedule DB에 넣기
function insertSchedule() {

    var param = {
        subject : selectSubject.value
    };

    callPostService("insertSchedule", param, function(data) {
        if(data.status == 1) {
            insertGridData();
        } else {
            swal(data.msg);
            return;
        }
    });
}

// 요일 가져오기
function getWeekday(data) {
    var day;
    switch(data)  {
        case "MON": day = "월"; break;
        case "TUE": day = "화"; break;
        case "WED": day = "수"; break;
        case "THU": day = "목"; break;
        case "FRI": day = "금"; break;
        case "SAT": day = "토"; break;
        case "SUN": day = "일"; break;
    }
    return day;
}

function loadSubjectList() {
    var selectedYear=$("#selectYear").val();
    //var start=selectedYear.indexOf("년도");
    //var end=selectedYear.indexOf("학기");
    var year=selectedYear.substring(0,4);
    var semester=selectedYear.substring(4);
    //swal(selectedYear+"   "+year+semester);
    var param={
        year : year,
        semester : semester
    }

    callPostService('/getSubjectList',param,"callLoadSubjectList");
}

// ================================ Callback Function ================================

// 수강년도 및 학기 데이터 가져오기 콜백
function callGetYearSemester(data) {
    // 수강년도/학기 리스트에 데이터 추가
    $.each(data, function(index, item) {
        console.log(item)
        var option = "<option value='" + item.year + item.semester + "'>"+ item.year + "년도 " + item.semester + "학기" + "</option>";
        $("#selectYear").append(option);
    });
}

// 수강 과목 가져오기 콜백
function callGetSubject(data) {
    subjectLists = data;
    $.each(subjectLists, function(index, item) {
        subjectLists[index].formatTime = callFormatTime(subjectLists[index].time);
    });
}

// 전공 데이터 가져오기 콜백
function callGetMajor(data) {
    // 전공에 데이터 추가
    $.each(data, function(index, item) {
        //console.log(item.major)
        var option = "<option value='" + item.major + "'>"+ item.major + "</option>";
        //var option = "<option value='" + "전공"  + "'>" + "</option>";
        $("#selectMajor").append(option);
    });
}

// 그리드에 뿌려줄 형태로 시간 변환
function callFormatTime(data) {
    if(data == null) return "";
    if(data.length == 0) return "";

    var time;
    var day1, day2;
    var daytime = data.substring(3, 11);
    daytime = daytime.substring(0, 2) + ":" + daytime.substring(2, 4) + "~"
        + daytime.substring(4, 6) + ":" + daytime.substring(6, 8);

    if(data.length == 11) {
        day1 = getWeekday(data.substring(0, 3));
    } else if(data.length == 22) {
        day1 = getWeekday(data.substring(0, 3));
        day2 = getWeekday(data.substring(11, 14));
    }

    time = data.length == 11 ? (day1 + " " + daytime) : (day1 + ", " + day2 + " " + daytime);
    return time;
}

// 본인의 시간표를 가져옴
function callLoadSubjectList(data){

    $.each(data,function(index,item){
        var rowData = [
            {
                subjectID: item.subjectID,
                code: item.code,
                major: item.major,
                subjectNO: item.subjectNO,
                time: callFormatTime(item.time),
                credit: item.credit,
                professor: item.professor
            }
        ];
        schedule.appendRows(rowData);
    })


}
