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
                    if(major == "전공") {
                        return {
                            label: item.subjectNO + " " + item.formatTime + " / " + item.professor,
                            value: item.subjectID,
                            test: item.subjectID
                        }
                    } else {
                        if(major == item.major) {
                            return {
                                label: item.subjectNO + " " + item.formatTime + " / " + item.professor,
                                value: item.subjectID,
                                test: item.subjectID
                            }
                        }
                    }
                }
            }));
        },
        select : function(event, ui) {
            event.preventDefault();
            $("#subject").val(ui.item.label);
            $("#subjectID").val(ui.item.value);
            selectSubject = ui.item.value;
            //alert(ui.item.value);
        }
    });
});

// ================================ Custom Function ================================

// 그리드 초기 세팅
function initGrid() {
    const data = [
        {
            id: '20211AAT200201',
            subjectID: '1',
            code: 'ABZ21001',
            major: '한국발전과국제개발협력연계전공',
            subject: '1960년대의저항문화',
            time: '월,수 10:00 ~ 12:00',
            credit: '3',
            professor: '홍길동'
        }
    ];

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
                name: 'subject'
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
    var yearSemester = $("#selectYear").val();
    var param = {
        year : yearSemester.substring(0, 4),
        semester : yearSemester.substring(4, 5)
    }
    callPostService('getMajor', param, 'callGetMajor')
}

// 그리드 선택된 항목 삭제
function deleteGridData() {
    var checkedRows = schedule.getCheckedRows();
    schedule.removeRow(checkedRows);
}

function insertGridData() {
    var rowData = [
        {
            id: '20211AAT200201',
            subjectID: '1',
            code: 'ABZ21001',
            major: '한국발전과국제개발협력연계전공',
            subject: '1960년대의저항문화',
            time: '월,수 10:00 ~ 12:00',
            credit: '3',
            professor: '김진영'
        }
    ];
    schedule.appendRow(rowData, {
        at : 1
    })
    //schedule.resetData(rowData);
}

// Schedule DB에 넣기
function insertSchedule() {

    var param = {
        subject : selectSubject
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