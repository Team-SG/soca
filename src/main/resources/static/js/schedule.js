/*
    2021.02.12
    최초 작성자 : PYE
    시간표 등록 / 수정 관련 기능이 정의되는 JavaScript
 */

const Grid = tui.Grid;
var schedule;

$(document).ready(function() {

    initGrid(); // 그리드 초기 세팅
    getYearSemester(); // 수강년도/학기 데이터 조회

    // [추가] 버튼 클릭 이벤트
    $("#btnInsert").click(function() {
        // #subject 에 입력된 데이터를 기반으로 insert 필요
    });

    // [삭제] 버튼 클릭 이벤트
    $("#btnDelete").click(function() {
        // 그리드 선택된 항목 삭제
        deleteGridData();
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

// 그리드 선택된 항목 삭제
function deleteGridData() {
    var checkedRows = schedule.getCheckedRows();
    schedule.removeRow(checkedRows);
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