$(document).ready(function() {
    let param = getQuery();
    let header = $(".toast-header");
    let adminHeader = $("#adminHead");

    if(param.state === "1") {
        header.append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">신고 목록</strong>');
        let text = "<th style='width: 15%'>번호</th><th style='width: 60%'>내용</th>><th style='width: 20%'>해결 여부</th>";
        adminHeader.html(text);
        callPostService('getAccuse', parseInt(param.checked), function(data){
            if (data.length !== 0) {
                paging(parseInt(param.page), data, param);
                showPosts(param.page, data, param);
            }
        });
    }
    else {
        header.append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">기술 문의 목록</strong>');
        let text = "<th style='width: 15%'>번호</th><th style='width: 60%'>내용</th><th style='width: 15%'>작성자</th><th style='width: 10%'>해결 여부</th>";
        adminHeader.html(text);
        callPostService('getAsk', parseInt(param.checked), function(data){
            if (data.length !== 0) {
                paging(parseInt(param.page), data, param);
                showPosts(param.page, data, param);
            }
        });
    }

    if(param.checked === "1")
        $("#checked").prop("checked", true);
    else
        $("#checked").prop("checked", false);

    $("#checked").change(function() {
        let href = "admin?state=" + param.state +"&page=1&checked="
        if (param.checked === "0")
            href += "1";
        else
            href += "0";
        location.href = href;
    })
})

function paging(currentPage, data, param) {
    let dataLength = data.length;
    let dataPerPage = 5; // 한 페이지 15개 가정
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

        location.href = "admin?state=" + param.state + "&page=" + selectedPage + "&checked=" + param.checked;
    })
}

function showPosts(currentPage, data, param) {
    let dataPerPage = 5;
    let first = (currentPage - 1) * dataPerPage;
    let last;
    if(currentPage == Math.floor(data.length / dataPerPage) + 1)
        last = first + data.length % dataPerPage;
    else
        last = first + dataPerPage

    let text = ""

    if(param.state === "1") {
        for (var dataN = first; dataN < last; dataN++) {
            text += "<tr style='height: 50px' onclick=\"location.href='adminList?state=" + param.state + "&num=" + data[dataN].accuseNum + "'\">";
            text += "<td>" + data[dataN].accuseNum + "</td>";
            if(data[dataN].content.length < 50)
                text += "<td>" + data[dataN].content + "</td>";
            else
                text += "<td>" + data[dataN].content+ "</td>";
            if (data[dataN].handleYN === false) {
                text += "<td>X</td>";
            } else {
                text += "<td>O</td>"
            }
            text += "</tr>"
        }
    }
    else if(param.state === "2") {
        for (var dataN = first; dataN < last; dataN++) {
            text += "<tr style='height: 50px' onclick=\"location.href='adminList?state=" + param.state + "&num=" + data[dataN].askNum + "'\">";
            text += "<td>" + data[dataN].askNum + "</td>";
            text += "<td>" + data[dataN].content.substring(0, 50).replaceAll("\\n", " ")  + "...</td>";
            text += "<td>" + data[dataN].nickname + "</td>";
            if (data[dataN].handleYN === false) {
                text += "<td>X</td>";
            } else {
                text += "<td>O</td>"
            }
            text += "</tr>"
        }
    }
    $("#adminData").empty();
    $("#adminData").append(text);
}