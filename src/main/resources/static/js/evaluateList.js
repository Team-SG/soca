/*
    2021.02.14
    최초 작성자 : PYE
    평가방 - 강의목록 기능이 정의되는 JavaScript
 */

var subjectLists = [];
var professors = [];

$(document).ready(function() {
    getAllMajors();
    getAllSubjects(1);
    getAllSubjects(2);
    $("#selectMajor").change(function(){
        $("#subject").val("");
    })

    autoComplete(1);
    $("input[name='searchCondition']").change(function() {
        $("#subject").val("");
        $("#selectMajor").val("전공");
        if($("input[id='courseNum']:checked").prop("checked")) {
            autoComplete(1);
        } else if($("input[id='courseName']:checked").prop("checked")) {
            autoComplete(2);
        } else if($("input[id='professorName']:checked").prop("checked")) {
            autoComplete(3);
        }
    })
});

function autoComplete(num) {
    var autoData = [];
    if(num == 3) {
        autoData = professors;
    } else {
        autoData = subjectLists
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
                        professor: item.professor
                    }
                    if(num == 3) {
                        result.label = item.professor + " 교수님";
                        result.value = item.professor
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
        }
    });
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

function getAllSubjects(num) {
    callPostService("getAllSubjects", num, function(data) {
        if(num == 1) {
            subjectLists = data;
        } else if(num == 2) {
            professors = data;
        }
    });
}