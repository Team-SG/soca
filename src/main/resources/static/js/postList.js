let autoData = [];
let selectItem = [];

$(document).ready(function() {
    $("#quick").load("/quickMenu");
    let param = getQuery();

    selectItem = {
        label: ""
    }

    if(param.checked === "1")
        $("#checked").prop("checked", true);
    else
        $("#checked").prop("checked", false);

    $("#searchKey").val(param.search);
    if(param.type === "title") {
        $("#selectCondition").val("title").prop("checked", true);
    }
    else {
        $("#selectCondition").val("subject").prop("checked", true);
    }

    $("#checked").change(function() {
        let href = "postList?page=1&checked="
        if (param.checked === "0")
            href += "1";
        else
            href += "0";
        href += "&type=" + param.type + "&search=" + param.search;
        location.href = href;
    })

    if(param.search === "") {
        callPostService("getAllPosts", param.checked, function (data) {
            if (data.length !== 0) {
                paging(parseInt(param.page), data, param);
                showPosts(param.page, data);
            }
        });
    }
    else {

        if(param.type === "subject")
            param.searchKey = param.search;
        else
            param.searchKey = "%" + param.search + "%";
        callPostService("getSelectedPosts", param, function (data) {
            let text = param.search + "의 검색 결과입니다.(" + data.length + "개)";
            $(".searchResult").text(text)
            if (data.length !== 0) {
                paging(parseInt(param.page), data, param);
                showPosts(param.page, data);
            }
        })
    }

    callPostService("getAllSubjects", 1, function(data){
        autoData = data;
    })
    let selected = $("#selectCondition option:selected").val();
    if(selected === "subject") {
        autoCompletePost();
    }

    $("#selectCondition").change(function(){
        selected = $("#selectCondition option:selected").val();
        selectItem = {
            label: ""
        }
        if(selected === "subject") {
            autoCompletePost();
            $("#searchKey").val('');
        }
        else if(selected === "title") {
            $("#searchKey").autocomplete({
                disabled: true
            });
            $("#searchKey").val('');
        }
    })

    $("#btnSearch").click(function(){
        selected = $("#selectCondition option:selected").val();
        let href = "postList?page=1&checked=" + param.checked + "&type=" + selected + "&search=";
        if(selected === "subject") {
            if(selectItem.label === "") {
                alert("과목 검색 후 선택해주세요.");
                return;
            }
            href += selectItem.label;
        }
        else if(selected === "title")
            href += $("#searchKey").val();
        location.href = href;
    })
})

function paging(currentPage, data, param) {
    let dataLength = data.length;
    let dataPerPage = 5; // 한 페이지 10개 가정; 현재 페이지 확인 위해 1개로 설정해놓음.
    let pageCount = 5; // 페이지 번호 5개
    let totalPage = Math.ceil(dataLength / dataPerPage);
    //let pageGroup = Math.ceil(currentPage / pageCount);
    let lastPage =  Math.floor((currentPage - 1)/pageCount)*pageCount + pageCount;
    let firstPage = Math.floor((currentPage - 1)/pageCount)*pageCount + 1;

    let next = lastPage + 1;
    let prev = firstPage - 5;

    if(lastPage > totalPage)
        lastPage = totalPage;

    let text = "";

    if(prev > 0) {
        text += "<li class='page-item'><a class='page-link' id='first'> << </a></li>";
        text += "<li class='page-item'><a class='page-link' id='prev'> < </a></li>";
    }
    for(let i = firstPage; i <= lastPage; i++) {
        if(i === currentPage)
            text += "<li class='page-item active'><a class='page-link' id='" + i + "'>" + i + "</a></li>";
        else
            text += "<li class='page-item'><a class='page-link' id='" + i + "'>" + i + "</a></li>";
    }

    if(lastPage < totalPage) {
        text += "<li class='page-item'><a class='page-link' id='next'> > </a></li>";
        text += "<li class='page-item'><a class='page-link' id='last'> >> </a></li>";
    }
    $("#pages").html(text);

    $("#pages a").click(function() {
        let $id = $(this).attr("id");
        let selectedPage = $(this).text();

        if($id === "next")
            selectedPage = next;
        if($id === "prev")
            selectedPage = prev;
        if($id === "first")
            selectedPage = 1;
        if($id === "last")
            selectedPage = totalPage;

        location.href = "postList?page=" + selectedPage + "&checked=" + param.checked + "&type=" + param.type + "&search=" + param.search;
    })
}

function showPosts(currentPage, data) {
    let dataPerPage = 5;
    let first = (currentPage - 1) * dataPerPage;
    let last;
    if(currentPage == Math.floor(data.length / dataPerPage) + 1)
        last = first + data.length % dataPerPage;
    else
        last = first + dataPerPage

    let text = ""

    for(var dataN = first; dataN < last; dataN++) {
        if(data[dataN].accusedYN === false) {
            text += "<tr onclick=\"location.href='postRead?postNum=" + data[dataN].postNum + "'\">";
            text += "<td>" + data[dataN].postNum + "</td>";
            text += "<td>" + data[dataN].subjectNo + "</td>";
            text += "<td>" + data[dataN].title + "</td>";
            text += "<td>" + data[dataN].nickname + "</td>";
            text += "<td>" + data[dataN].postTime + "</td>";
        }
        else {
            text += "<tr class='accusedY'>";
            text += "<td>" + data[dataN].postNum + "</td>";
            text += "<td>" + data[dataN].subjectNo + "</td>";
            text += "<td>신고 접수된 게시글입니다.</td>";
            text += "<td>???</td>";
            text += "<td>" + data[dataN].postTime + "</td>"
        }

        if(data[dataN].solYN == true)
            text += "<td>O</td>";
        else
            text += "<td>X</td>";
        text += "</tr>"
    }
    $("#postData").empty();
    $("#postData").append(text);
    $(".accusedY").css("color", "#d3d3d3");
}

function autoCompletePost() {
    $("#searchKey").autocomplete({
        disabled: false,
        source : function(request, response) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.map(autoData, function(item) {
                var testVal = item.subjectNO
                if (matcher.test(testVal)) {
                    var result = {
                        label: item.subjectNO,
                        value: item.subjectNO,
                        code: item.code,
                        major: item.major,
                        professor: item.professor,
                        subjectNO: item.subjectNO,
                        num: 1
                    }
                    return result;
                }
            }));
        },
        select : function(event, ui) {
            event.preventDefault();
            $("#searchKey").val(ui.item.label);
            selectItem = ui.item;
        }
    })
}