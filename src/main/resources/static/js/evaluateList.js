/*
    2021.02.14
    최초 작성자 : PYE
    평가방 - 강의목록 기능이 정의되는 JavaScript
 */

const Grid = tui.Grid;
var subjectLists = [];
var professors = [];
var thisYearSubjectLists = [];
var thisYearProfessors = [];
var selectItem;

$(document).ready(function() {
    initGrid(); // 그리드 초기 세팅
    getAllMajors();
    getAllSubjects();
    selectItem = {
        label: ""
    }
    $("#selectMajor").change(function(){
        schedule.clear();
        $("#subject").val("");
    })

    getRecentEval();

    // 기본 설정이 과목번호 이므로 autocomplete 1
    autoComplete(1);
    $("input[name='searchCondition']").change(function() {
        schedule.clear();
        $("#subject").val("");
        $("#selectMajor").val("전공");
        if($("input[id='courseNum']:checked").prop("checked")) {
            //$("#majortext").show();
            $("#major").show();
            $("#hideSubjectLists").empty();
            $("#subjectLists").hide();
            // 과목번호 autocomplete
            autoComplete(1);
        } else if($("input[id='courseName']:checked").prop("checked")) {
            //$("#majortext").show();
            $("#major").show();
            $("#hideSubjectLists").empty();
            $("#subjectLists").hide();
            // 과목명 autocomplete
            autoComplete(2);
        } else if($("input[id='professorName']:checked").prop("checked")) {
            // 교수 명일 때 소속구분 가리기
            //$("#majortext").hide();
            $("#major").hide();
            $("#hideSubjectLists").empty();
            $("#subjectLists").hide();
            // 교수명 autocomplete
            autoComplete(3);
        }
    })

    $("#subjectLists").hide();
    $("#btnSearch").click(function(){
        schedule.clear();
        showSearchData();
        $("#subjectLists").show(); //slideUp slideDown..
    });

    $(".menu>a").click(function(){
        $(this).next("ul").toggleClass("hide");
    })

});

// ================================ Custom Function ================================

// 그리드 초기 세팅
function initGrid() {
    const data = [];

    schedule = new Grid({
        el: document.getElementById('grid'),
        data: data,
        // rowHeaders: ['checkbox'],
        scrollY: false,
        columns: [
            {
                header: '과목번호',
                width: 'auto',
                minWidth: '90',
                align: 'center',
                name: 'code',
                sortable: true,
            },
            {
                header: '학과',
                width: 'auto',
                minWidth: '230',
                name: 'major',
                sortable: true,
            },
            {
                header: '과목',
                width: 'auto',
                minWidth: '250',
                name: 'subjectNO'
            },
            {
                header: '교수',
                width: 'auto',
                minWidth: '100',
                align: 'center',
                name: 'professor'
            },
            {
                header: '평점',
                width: 'auto',
                minWidth: '100',
                align: 'center',
                name: 'quality'
            },
            {
                header: '학점만족도',
                width: 'auto',
                minWidth: '100',
                align: 'center',
                name: 'gradeSatis'
            }
        ]
    });

    schedule.resetData(data);
}


function autoComplete(num) {
    var autoData = [];
    if($("input[id='thisSem']:checked").prop("checked")) {
        if (num == 3) {
            autoData = thisYearProfessors;
        } else {
            autoData = thisYearSubjectLists;
        }
    } else {
        if (num == 3) {
            autoData = professors;
        } else {
            autoData = subjectLists;
        }
    }

    $("#subject").autocomplete({
        source : function(request, response) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.map(autoData, function(item) {
                var testVal;
                if(num == 1) {
                    testVal = item.code;
                } else if(num == 2) {
                    testVal = item.subjectNO;
                } else if(num == 3) {
                    testVal = item.professor;
                }
                if (matcher.test(testVal)) {
                    var major = $("#selectMajor").val();
                    var result = {
                        label: item.subjectNO + "[" + item.code + "]",
                        value: item.subjectNO + item.code,
                        code: item.code,
                        major: item.major,
                        professor: item.professor,
                        subjectNO: item.subjectNO,
                        num : 1
                    }
                    if(num == 3) {
                        result.label = item.professor + " 교수님";
                        result.value = item.professor;
                        result.num = 3;
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
            selectItem = ui.item;
        }
    });
}

function showSearchData() {
    //$("#subjectLists").cleanData();
    //$("#subjectLists").append(selectItem.label);
    $("#hideSubjectLists").empty();

    var param;

    // autocomplete select를 하지 않았을 때
    if (selectItem.label.length == 0) {
        //$("#menuSubjectLists").attr('alt', "검색결과");
        param = {
            nowItem: $("#subject").val(),
            num: 1
        }
        if ($("input[id='thisSem']:checked").prop("checked")) {
            param.num = 2;
        }

        if ($("input[id='professorName']:checked").prop("checked")) {
            callPostService("findSubBySubstr", param, function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#menuSubjectLists").attr('alt', "검색결과");
                    var param2 = {
                        nowItem: data[i],
                        num: 1
                    }
                    if ($("input[id='thisSem']:checked").prop("checked")) {
                        param2.num = 2;
                    }
                    findSubByProf(param2);
                }
            })
        }
        else {
            callPostService("findProfBySubstr", param, function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#menuSubjectLists").attr('alt', "검색결과");
                    var param2 = {
                        nowItem: data[i],
                        num: 1
                    }
                    if ($("input[id='thisSem']:checked").prop("checked")) {
                        param2.num = 2;
                    }
                    findProfBySubject(param2);
                }
            })
        }
    }
    // autocomplete select를 했을 때
    else {
        $("#menuSubjectLists").attr('alt', selectItem.label);
        if ($("input[id='professorName']:checked").prop("checked")) {
            param = {
                nowItem: selectItem.professor,
                num: 1
            }
            if ($("input[id='thisSem']:checked").prop("checked")) {
                param.num = 2;
            }
            findSubByProf(param);
        } else {
            if (selectItem.label.length != 0) {
                param = {
                    nowItem: selectItem.subjectNO,
                    code: selectItem.code,
                    major: selectItem.major,
                    num: 1
                }
            }
            if ($("input[id='thisSem']:checked").prop("checked")) {
                param.num = 2;
            }
            findProfBySubject(param);
        }
    }

    //$("#hideSubjectLists").append.html("<li>메뉴1-1</li>")
}

function findProfBySubject(param) {
    callPostService("findProfBySubject", param, function (data) {
        for (var i = 0; i < data.length; i++) {
            var rowData = [
                {
                    code: param.code,
                    major: param.major,
                    subjectNO: param.nowItem,
                    professor: data[i],
                    quality: 0,
                    gradeSatis: 0
                }
            ];
            schedule.appendRows(rowData);
            $("#hideSubjectLists").append("<li>" + data[i] + "</li>")
        }
    })
}

function findSubByProf(param) {
    callPostService("findSubByProf", param, function (data) {
        for (var i = 0; i < data.length; i++) {
            var rowData = [
                {
                    code: data[i].code,
                    major: data[i].major,
                    subjectNO: data[i].subjectNO,
                    professor: param.nowItem
                }
            ];
            schedule.appendRows(rowData);
            //$("#hideSubjectLists").append("<li>" + data[i] + "</li>")
        }
    })
}

function getAllMajors() {
    callPostService('getAllMajors', null, 'callGetAllMajors')
}

function callGetAllMajors(data) {
    // 전공에 데이터 추가
    $("#selectMajor").append("<option>전공</option>")
    $.each(data, function(index, item) {
        var option = "<option value='" + item.major + "'>"+ item.major + "</option>";
        $("#selectMajor").append(option);
    });
}

function getAllSubjects() {
    for(var num = 1; num <= 4; num++) {
        callPostService("getAllSubjects", num, function (data) {
            if (num == 1) {
                subjectLists = data;
            } else if (num == 2) {
                professors = data;
            } else if (num == 3) {
                thisYearSubjectLists = data;
            } else if (num == 4) {
                thisYearProfessors = data;
            }
        });
    }
}

function getRecentEval() {

    callPostService("getRecentEval", null, function(data){
        for(var dataN = data.length - 1; dataN >= data.length - 3; dataN--) {
            if(dataN < 0) {
                break;
            }
            var param = {
                subjectID: data[dataN].subjectID
            }
            callPostService("getSubjectData", param, function (data2) {
                var text = '<li class="list-group-item justify-content-between align-items-left pt-2 pb-2 pl-3 pr-3">'
                    + '<span class="badge badge-primary">New</span>'
                    + '<a class="ml-2 mr-2" style="color:#000000">' + data2.subjectNO + ' - ' + data2.professor + '</a>';

                if(data[dataN].score1 != 0) {
                    text += '<ion-icon name="add-circle-outline"></ion-icon>';
                }

                // 좋아요 개수
                text += '<div class="float-right">'
                text += '<ion-icon name="heart-circle-outline"></ion-icon>'
                    + '<span class="pl-1 pr-3">' + data[dataN].recommendNum + '</span>'

                // 별점
                for (var i = 2; i <= data[dataN].quality; i = i + 2) {
                    text += '<ion-icon name="star"></ion-icon>';
                }
                if (data[dataN].quality % 2 == 1) {
                    text += '<ion-icon name="star-half"></ion-icon>'
                }
                for (var i = data[dataN].quality; i < 9; i = i + 2) {
                    text += '<ion-icon name="star-outline"></ion-icon>'
                }

                // comment
                text += '</div>' + '</br></br>'
                    + '<a class="ml-3" style="color:#000000">' + data[dataN].commentFinal + '</a>'
                    + '</li>'

                // 삽입
                $("#recentEval").append(text);
            })
        }
    })
}