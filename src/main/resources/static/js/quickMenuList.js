const Grid = tui.Grid;
let gridData;
var selectItem;
var subjectLists = [];

$(document).ready(function() {
    $("#quick").load("/quickMenu");
    initGrid();
    getAllMajors();
    getAllSubjects();
    autoComplete(1);

    $("#selectMajor").change(function(){
        gridData.clear();
        $("#subject").val("");
    })

    $("input[name='searchCondition']").change(function() {
        gridData.clear();
        $("#subject").val("");
        $("#selectMajor").val("전공");
        if($("input[id='courseNum']:checked").prop("checked")) {
            $("#major").show();
            $("#hideSubjectLists").empty();
            $("#subjectLists").hide();
            // 과목번호 autocomplete
            autoComplete(1);
        } else if($("input[id='courseName']:checked").prop("checked")) {
            $("#major").show();
            $("#hideSubjectLists").empty();
            $("#subjectLists").hide();
            // 과목명 autocomplete
            autoComplete(2);
        }
    })

    $("#btnSearch").click(function(){
        gridData.clear();
        showSearchData();
        $("#subjectLists").show(); //slideUp slideDown..
    });

})


function initGrid() {
    const data = [];
    gridData = new Grid({
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
                align: 'center',
                name: 'major',
            },
            {
                header: '과목',
                width: 'auto',
                minWidth: '250',
                align: 'center',
                name: 'subjectNO'
            }
        ]
    });

    gridData.on('click', (ev) => {
        if(ev.targetType === "cell") {
            swal({
                text: "즐겨찾기에 추가하시겠습니까?",
                buttons: {
                    cancel: "취소",
                    confirm: "확인"
                }
            }).then(function (result) {
                if (result) {
                    callPostService('duplicateLiked', gridData.getRow(ev.rowKey).subjectNO, function (data) {
                        if (data === false) {
                            swal("이미 추가된 데이터입니다.");
                        } else {
                            if (gridData.getRow(ev.rowKey).subjectNO != null) {
                                insertLiked(gridData.getRow(ev.rowKey).code, gridData.getRow(ev.rowKey).subjectNO);
                            }
                        }
                    })
                }
            })
        }
    })

    gridData.resetData(data);
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
    callPostService("getAllSubjects", 1, function (data) {
        subjectLists = data;
    })
}

function autoComplete(num) {
    var autoData = subjectLists;

    $("#subject").autocomplete({
        source : function(request, response) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.map(autoData, function(item) {
                var testVal;
                if(num == 1) {
                    testVal = item.code;
                } else if(num == 2) {
                    testVal = item.subjectNO;
                }
                if (matcher.test(testVal)) {
                    var major = $("#selectMajor").val();
                    var result = {
                        label: item.subjectNO + "[" + item.code + "]",
                        value: item.subjectNO + item.code,
                        code: item.code,
                        major: item.major,
                        subjectNO: item.subjectNO,
                        num : 1
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
    $("#menuSubjectLists").attr('alt', selectItem.label);
    var rowData = [];
    var child = {
            code: selectItem.code,
            major: selectItem.major,
            subjectNO: selectItem.subjectNO,
    }
    rowData.push(child);
    rowData.forEach(row => {
        gridData.appendRow(row);
    });
}

function insertLiked(code, subjectNO) {
    let text = "";
    text += "<tr>"
    text += "<td>" + subjectNO + "</td>"
    text += "<td><div type='button' class='btnDeleteLiked'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\">" +
        "  <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>" +
        "</svg></div></td>"
    //text += "<td><input type='button' class='btnDeleteLiked' value='X'></td>"
    text += "</tr>"
    $("#liked").append(text);
    let param = {
        code: code,
        subjectNO: subjectNO
    }

    //let btnDeleteLiked = $("#btnDeleteLiked");
    $(".btnDeleteLiked").css({
        "background-color": "white",
        "border": "0px",
        "color": "#212529"
    })

    $(".btnDeleteLiked").click(function(event){
        swal({
            text: "삭제하시겠습니까?",
            buttons: {
                cancel : "취소",
                confirm : "확인"
            }
        }).then(function(result){
            if(result) {
                let btnDelete = $(event.target);
                let tr = btnDelete.parent().parent().parent();
                let data = tr.children().eq(0).text();
                callPostService("deleteLiked", data, null);
                tr.remove();
            }
        })
    })

    callPostService("insertLiked", param, null);
}