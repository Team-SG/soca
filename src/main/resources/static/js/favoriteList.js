$(document).ready(function() {
    let param = getQuery();
    sessionStorage.setItem("state", 1);

    if(param.state === "1") {
        $("#favoriteHeader").append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">인기 강의 목록</strong>');
        callPostService('getFavoriteSub', null, function(data){
            paging(param, data);
            showFavoriteLists(param, data);
        })
    }
    else {
        $("#favoriteHeader").append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">인기 교수 목록</strong>')
        callPostService('getFavoriteProf', null, function(data){
            paging(param, data);
            showFavoriteLists(param, data);
        })
    }

    $("#btnGoBack").click(function(){
        history.back();
        location.href = document.referrer;
    })
})

function paging(param, data) {
    let currentPage = param.page;
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
        if(i == currentPage)
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

        location.href = "favoriteList?state=" + param.state + "&page=" + selectedPage;
    })
}

function showFavoriteLists(param, data){
    let currentPage = param.page;
    let dataPerPage = 5;
    let first = (currentPage - 1) * dataPerPage;
    let last;
    if(currentPage == Math.floor(data.length / dataPerPage) + 1)
        last = first + data.length % dataPerPage;
    else
        last = first + dataPerPage

    let text = ""

    if(param.state === "1") {
        for(var dataN = first; dataN < last; dataN++) {
            let goSelectedEval = 'evaluateSelected?code=' + data[dataN].code + '&professor=' + data[dataN].professor +'&page=1';
            text += '<tr><td><a href=' + goSelectedEval + ' class="p-1" style="color:#000000; display: block">'
                + '<span class="badge badge-warning fs-090 mr-1">' + (dataN + 1) +'</span>'
                + '<span>' + data[dataN].professor + '-' + data[dataN].subjectNO +'</span>'
                + '</a>'
                + '</td></tr>';
        }

    }
    else {
        for(var dataN = first; dataN < last; dataN++) {
            let goSelectedEval = 'evaluateSelected?code=' + '&professor=' + data[dataN] +'&page=1';
            text += '<tr><td><a href=' + goSelectedEval + ' class="p-1" style="color:#000000; display: block">'
                + '<span class="badge badge-success fs-090 mr-1">' + (dataN + 1) + '</span>'
                + '<span>' + data[dataN] + '</span>'
                + '</a>'
                + '</td></tr>';
        }
    }
    $("#favoriteData").empty();
    $("#favoriteData").append(text);
}