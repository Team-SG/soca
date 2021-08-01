/*
    2021.07.27
    최초 작성자 : KDB
    평가방 - 최근 강의평가 더보기 목록
 */
var dataLength;
var dataPerPage = 2;
var pageCount = 5;
var totalPage;
var pageGroup;
var currentPage;
var firstPage;
var lastPage;
var prevPage;
var nextPage;

$(document).ready(function(){
    paging();

    var offset = (currentPage-1) * dataPerPage;
    getRecentEval(offset, dataPerPage);

    $("#pages a").click(function(){
        var $id=$(this).attr("id");
        var selectedPage = $(this).text();

        if($id == "prev") selectedPage = prevPage;
        if($id == "next") selectedPage = nextPage;
        if($id == "first") selectedPage = 1;
        if($id == "last") selectedPage = totalPage;

        location.href = "/recentEvalRes?page=" + selectedPage;
    })
})

function paging(){
    var param = getQuery2()
    currentPage = parseInt(param.get("page"));
    dataLength = getRecentEvalCnt();
    totalPage = Math.ceil(dataLength/dataPerPage);
    pageGroup = Math.ceil(currentPage/pageCount);
    lastPage = currentPage + Math.floor(pageCount/2);
    firstPage = currentPage - Math.floor(pageCount/2);

    if(totalPage <= pageCount){
        firstPage = 1;
        lastPage = totalPage;
    }
    else{
        if(lastPage > totalPage) {
            lastPage = totalPage;
            firstPage = lastPage - pageCount + 1;
        }
        if(firstPage < 1) {
            firstPage = 1;
            lastPage = firstPage + pageCount - 1;
        }
    }

    prevPage = currentPage - 1;
    nextPage = currentPage + 1;


    if(prevPage <= 0){
        const prev = document.getElementById('prevPage');
        prev.classList.add("disabled");
        const first = document.getElementById('firstPage');
        first.classList.add("disabled");
    }
    if(nextPage > totalPage){
        const next = document.getElementById('nextPage');
        next.classList.add("disabled");
        const last = document.getElementById('lastPage');
        last.classList.add("disabled");
    }

    var text = "";

    for(var i = firstPage; i <= lastPage ;i++){
        if(i == currentPage)
            text += '<li class="page-item active"><a class="page-link" id="' + i + '">' + i + '</a></li>';
        else
            text += '<li class="page-item"><a class="page-link" id="' + i + '">' + i + '</a></li>';
    }

    $("#prevPage").after(text);
}

function getRecentEvalCnt(){
    var cnt;
    callPostService("getRecentEvalCnt",null,function(data){
        cnt = data;
    })
    return cnt;
}

function getRecentEval(offset, num) {

    var param={
        offset : offset,
        num : num
    }
    callPostService("getRecentEval", param, function(data){
        for(var dataN = 0; dataN < data.length ; dataN++) {
            var param = {
                subjectID: data[dataN].subjectID
            }
            callPostService("getSubjectData", param, function (data2) {
                var text = '<li class="list-group-item justify-content-between align-items-left pt-2 pb-2 pl-3 pr-3">'
                    + '<span class="badge badge-primary">New</span>'
                    + '<a class="ml-2 mr-2" style="color:#000000"  href="\evaluateComplete?postNum='+data[dataN].postNum+'&subjectID='+data[dataN].subjectID+'">' + data2.subjectNO + ' - ' + data2.professor + '</a>';

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
                $("#moreRecentEval").append(text);
            })
        }
    })
}