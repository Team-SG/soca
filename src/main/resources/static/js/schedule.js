/*
    2021.02.12
    최초 작성자 : PYE
    시간표 등록 / 수정 관련 기능이 정의되는 JavaScript
 */

const Grid = tui.Grid;
var schedule;
var subjectLists = [];
var subject;

$(document).ready(function() {

    initGrid(); // 그리드 초기 세팅
    getYearSemester(); // 수강년도/학기 데이터 조회
    getMajor(); // 전공 데이터 조회
    findSubjects();
    // [추가] 버튼 클릭 이벤트
    $("#btnInsert").click(function() {
        insertGridData();
    });

    // [삭제] 버튼 클릭 이벤트
    $("#btnDelete").click(function() {
        // 그리드 선택된 항목 삭제
        deleteGridData();
    });

    var auto = [{"label" : "김치", "value" : "gimchi"}, {"label" : "김밥", "value" : "gimbab"}]
    // autoComplete 뜨게.
    $("#subject").autocomplete({
        source :
         function(request, response) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.map(subjectLists, function(item) {
                if (matcher.test(item.label)) {
                    return (item.label + " - " + item.time + " / " + item.professor + " 교수님");
                }
            })); },
        select :
        function(event, ui) {
            //alert(ui.item.value);
            //alert(ui.item.label);
            console.log(ui.item.label);
            console.log(ui.item.subjectID);
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

// 그리드에 넣기
function insertGridData() {
    //console.log(subject);
    //console.log( $("#subject").val() );
    var param = {
        subject : "hi" //$("#subject").val()
    };

    callPostService("insertSubject", param, null);
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

// 전공 데이터 가져오기 콜백
function callGetMajor(data) {
    // 전공에 데이터 추가
    $.each(data, function(index, item) {
        console.log(item.major)
        var option = "<option value='" + item.major + "'>"+ item.major + "</option>";
        //var option = "<option value='" + "전공"  + "'>" + "</option>";
        $("#selectMajor").append(option);
    });
}

function findSubjects() {
    var param = {
        yearSemester : $("#selectYear option:selected").val()
    }

    callPostService("findSubjects", param, function(data) {
        for(var i = 0; i < data.length; i++) {
            var time;
            var day = data[i].time.substring(0, 3);
            var daytime = data[i].time.substring(3, 11);
            daytime = daytime.substring(0, 2) + ":" + daytime.substring(2, 4) + "~" + daytime.substring(4, 6) + ":" + daytime.substring(6, 8)
            switch(day)
            {
                case "MON":
                    day="월";
                    break;
                case "TUE":
                    day="화";
                    break;
                case "WED":
                    day="수";
                    break;
                case "THR":
                    day="목";
                    break;
                case "FRI":
                    day="금";
                    break;
                case "SAT":
                    day="토";
                    break;
                case "SUN":
                    day="일";
                    break;
            }
            if(data[i].time.length == 11) {
                time = day + " " + daytime;
            } else if(data[i].time.length == 22) {
                var day2 = data[i].time.substring(11, 14);
                switch(day2)
                {
                    case "MON":
                        day2="월";
                        break;
                    case "TUE":
                        day2="화";
                        break;
                    case "WED":
                        day2="수";
                        break;
                    case "THU":
                        day2="목";
                        break;
                    case "FRI":
                        day2="금";
                        break;
                    case "SAT":
                        day2="토";
                        break;
                    case "SUN":
                        day2="일";
                        break;
                }
                time = day + ", " + day2 + " " + daytime;
            }
            subjectLists.push({"label":data[i].subjectNO, "value":data[i].subjectID, "time":time, "professor": data[i].professor, "subjectID":data[i].subjectID});
        }
    })
}