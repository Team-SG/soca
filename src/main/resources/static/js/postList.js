$(document).ready(function() {
    let param = getQuery();
    let checkedYN = sessionStorage.getItem("checked");
    if(checkedYN == null)
        sessionStorage.setItem("checked", "0");

    if(checkedYN === "0")
        $("#checked").prop("checked", false);
    else
        $("#checked").prop("checked", true);

    $("#checked").change(function(){
        if(checkedYN === "0")
            sessionStorage.setItem("checked", "1");
        else
            sessionStorage.setItem("checked", "0");

        location.href = "postList?page=1";
        }
    )
    callPostService("getAllPosts", sessionStorage.getItem("checked"), function(data){
        if (data.length != 0) {
            paging(parseInt(param.page), data);
            showPosts(param.page, data);
        }
    });
})

function paging(currentPage, data) {
    let dataLength = data.length;
    let dataPerPage = 1; // 한 페이지 10개 가정; 현재 페이지 확인 위해 1개로 설정해놓음.
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

        location.href = "postList?page=" + selectedPage;
    })
}

function showPosts(currentPage, data) {
    let dataPerPage = 1;
    let first = (currentPage - 1) * dataPerPage;
    let last;
    if(currentPage == Math.floor(data.length / dataPerPage) + 1)
        last = first + data.length % dataPerPage;
    else
        last = first + dataPerPage

    let text = ""

    for(var dataN = first; dataN < last; dataN++) {
        text += "<tr>"
        text += "<td>" + data[dataN].postNum + "</td>";
        text += "<td>" + data[dataN].subjectNo + "</td>";
        text += "<td onclick=\"location.href='questionRead'\">" + data[dataN].title + "</td>";
        text += "<td>" + data[dataN].nickname + "</td>";
        text += "<td>" + data[dataN].postTime + "</td>";
        if(data[dataN].solYN == true)
            text += "<td>O</td>";
        else
            text += "<td>X</td>";
        text += "</tr>"
    }
    $("#postData").append(text);
}