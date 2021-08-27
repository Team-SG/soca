/*
    2021.02.14
    최초 작성자 : PYE
    평가방 - 강의목록 기능이 정의되는 JavaScript
 */

const Grid = tui.Grid;
var GridLists;
var subjectLists = [];
var professors = [];
var thisYearSubjectLists = [];
var thisYearProfessors = [];
var selectItem;

$(document).ready(function() {
    if(self.name != 'reload') {
        self.name = 'reload';
        self.location.reload();
    }
    else
        self.name = "";

    initGrid(); // 그리드 초기 세팅
    getAllMajors();
    getAllSubjects();
    selectItem = {
        label: ""
    }
    $("#selectMajor").change(function(){
        GridLists.clear();
        $("#subject").val("");
        selectItem = {
            label: ""
        }
    })

    getRecentEval();

    // 기본 설정이 과목번호 이므로 autocomplete 1
    autoComplete(1);
    $("input[name='searchCondition']").change(function() {
        GridLists.clear();
        $("#subject").val("");
        $("#selectMajor").val("전공");
        selectItem = {
            label: ""
        }
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
        GridLists.clear();
        showSearchData();
        $("#subjectLists").show(); //slideUp slideDown..
    });

    /*
    $(".menu>a").click(function(){
        $(this).next("ul").toggleClass("hide");
    })*/

});

// ================================ Custom Function ================================

// 그리드 초기 세팅
function initGrid() {
    const data = [];
    GridLists = new Grid({
        el: document.getElementById('grid'),
        data: data,
        // rowHeaders: ['checkbox'],
        treeColumnOptions: {
            name: 'code',
            useIcon: false,
            useCascadingCheckbox : true
        },
        scrollY: false,
        columns: [
            {
                header: '과목번호',
                width: 'auto',
                minWidth: '90',
                align: 'center',
                name: 'code',
            },
            {
                header: '학과',
                width: 'auto',
                minWidth: '230',
                name: 'major',
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
                name: 'evaluationAvg',
                sortable: true,
            },
            {
                header: '강의력',
                width: 'auto',
                minWidth: '100',
                align: 'center',
                name: 'qualityAvg',
                sortable: true,
            },
            {
                header: '학점만족도',
                width: 'auto',
                minWidth: '100',
                align: 'center',
                name: 'gradeSatisAvg',
                sortable: true,
            }
        ]
    });

    GridLists.on('click', (ev) => {
        if(ev.columnName == "subjectNO") {
            if(GridLists.getRow(ev.rowKey).professor != null)
                goSelected(GridLists.getRow(ev.rowKey));
        }
    })

    GridLists.resetData(data);
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

    if(selectItem.label === "")
        return;
    var param;
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

    //$("#hideSubjectLists").append.html("<li>메뉴1-1</li>")
}

function findProfBySubject(param) {
    callPostService("findProfBySubject", param, function (data) {
        if(data.length == 0) {
            return;
        }
        else if(data.length != 1) {
            var rowData = [{
                    code: param.code,
                    major: param.major,
                    subjectNO: param.nowItem,
                    _attributes: {
                        expanded: false
                    },
                     _children: []
                }];

            for (var i = 0; i < data.length; i++) {
                var child = {
                    code: param.code,
                    major: param.major,
                    subjectNO: param.nowItem,
                    professor: data[i],
                    evaluationAvg: "0",
                    qualityAvg: "0",
                    gradeSatisAvg: "0"
                }
                callPostService("getEvaluateData", child, function(data){
                    child.evaluationAvg = data.evaluationAvg/2;
                    child.qualityAvg = data.qualityAvg/2;
                    child.gradeSatisAvg = data.gradeSatisAvg/2;
                })
                rowData[0]._children.push(child);
            }
            GridLists.resetData(rowData);
        }
        else {
            var rowData = {
                    code: param.code,
                    major: param.major,
                    subjectNO: param.nowItem,
                    professor: data[0],
                    evaluationAvg: "0",
                    quality: "0",
                    gradeSatis: "0"
                };
            callPostService("getEvaluateData", rowData, function(data){
                rowData.evaluationAvg = data.evaluationAvg/2;
                rowData.qualityAvg = data.qualityAvg/2;
                rowData.gradeSatisAvg = data.gradeSatisAvg/2;
            })
            //GridLists.appendRow(rowData);
        }
        GridLists.appendRow(rowData);
        //$("#hideSubjectLists").append("<li>" + data[i] + "</li>")
    })
}

function findSubByProf(param) {
    callPostService("findSubByProf", param, function (data) {
        if(data.length == 0) {
            return;
        }
        var rowData = [];
        for (var i = 0; i < data.length; i++) {
            var child = {
                code: data[i].code,
                major: data[i].major,
                subjectNO: data[i].subjectNO,
                professor: param.nowItem,
                evaluationAvg: "0",
                qualityAvg: "0",
                gradeSatisAvg: "0"
            }
            callPostService("getEvaluateData", child, function(data){
                child.evaluationAvg = data.evaluationAvg/2;
                child.qualityAvg = data.qualityAvg/2;
                child.gradeSatisAvg = data.gradeSatisAvg/2;
            })
            rowData.push(child);
        }
        GridLists.appendRows(rowData);
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
    var param={
        offset : 0,
        num : 3
    }
    callPostService("getRecentEval", param, function(data){
        for(var dataN = 0; dataN < data.length ; dataN++) {
            var param = {
                subjectID: data[dataN].subjectID
            }
            let today = new Date();
            let postTime = new Date(data[dataN].postTime);
            let dateDiff = Math.ceil((today.getTime() - postTime.getTime())/(1000*3600*24));
            callPostService("getSubjectData", param, function (data2) {
                if(dateDiff > 1) {
                    var text = '<li class="list-group-item justify-content-between align-items-left pt-2 pb-2 pl-3 pr-3">'
                        + '<span class="badge badge-primary">' + data[dataN].postNum + '</span>'
                        + '<a class="ml-2 mr-2" style="color:#000000"  href="\evaluateComplete?postNum=' + data[dataN].postNum + '&subjectID=' + data[dataN].subjectID + '">' + data2.subjectNO + ' - ' + data2.professor + '</a>';
                }
                else {
                    var text = '<li class="list-group-item justify-content-between align-items-left pt-2 pb-2 pl-3 pr-3">'
                    + '<span class="badge badge-primary">' + data[dataN].postNum + '</span>'
                    + '<a class="ml-2 mr-2" style="color:#000000"  href="\evaluateComplete?postNum=' + data[dataN].postNum + '&subjectID=' + data[dataN].subjectID + '">' + data2.subjectNO + ' - ' + data2.professor + '</a>'
                    + '<span class="badge badge-primary">new</span>';
                }
                if(data[dataN].score1 != 0) {
                    text += '<ion-icon name="add-circle-outline"></ion-icon>';
                }

                // 좋아요 개수
                text += '<div class="float-right">'
                text += '<ion-icon name="heart-circle-outline"></ion-icon>'
                    + '<span class="pl-1 pr-3">' + data[dataN].recommendNum + '</span>'

                // 별점
                for (var i = 2; i <= data[dataN].evaluation; i = i + 2) {
                    text += '<ion-icon name="star"></ion-icon>';
                }
                if (data[dataN].evaluation % 2 == 1) {
                    text += '<ion-icon name="star-half"></ion-icon>'
                }
                for (var i = data[dataN].evaluation; i < 9; i = i + 2) {
                    text += '<ion-icon name="star-outline"></ion-icon>'
                }

                // comment
                text += '</div>' + '</br></br>'
                    + '<span class="ml-3" style="color:#000000">' + data[dataN].commentFinal + '</span>'
                    + '</li>'

                // 삽입
                $("#recentEval").append(text);
            })
        }
    })
}

function goSelected(param) {

    /*var goform = $("<form>", {
        method: "post",
        action: "evaluateSelected",
        target: "_self",
        html: "<input type='hidden' name='code' value='" + param.code + "'>",
        value : [["code", param.code],
                ["subjectNO", param.subjectNO],
                ["professor", param.professor]]
    }).appendTo("body");

    goform.submit();*/
    sessionStorage.setItem("state", "1");
    location.href = "evaluateSelected?code=" + param.code + "&professor=" + param.professor + "&page=1";
}