/*
    2021.07.27
    최초 작성자 : KDB
    평가방 - 최근 강의평가 더보기 목록
 */


$(document).ready(function(){
    paging();
})

function paging(){
    var param = getQuery2()
    var currentPage = parseInt(param.get("page"));
    var dataLength = getRecentEvalCnt();
    var dataPerPage = 2;
    var pageCount = 5;
    var totalPage = Math.ceil(dataLength/dataPerPage);
    var pageGroup = Math.ceil(currentPage/pageCount);
    var lastPage = pageGroup * pageCount;
    var firstPage = lastPage - pageCount + 1;
    var prevPage;
    var nextPage;

    if(lastPage > totalPage) lastPage = totalPage;
    if(firstPage < 1) firstPage = 1;

    nextPage = lastPage + 1;
    prevPage = firstPage - pageCount;

    var text = "";

    if(prevPage > 0) text += '<li class="page-item"><a class="page-link" href="#" id="first"> << </a></li>'
        +  '<li class="page-item"><a class="page-link" href="#" id="prev"> < </a></li>';

    for(var i = firstPage; i <= lastPage ;i++){
        if(i == currentPage)
            text += '<li class="page-item active"><a class="page-link" id="' + i + '">' + i + '</a></li>';
        else
            text += '<li class="page-item"><a class="page-link" id="' + i + '">' + i + '</a></li>';
    }

    if(nextPage <= totalPage) text += '<li class="page-item"><a class="page-link" href="#" id="next"> > </a></li>'
                                    + '<li class="page-item"><a class="page-link" href="#" id="last"> >> </a></li>';

    $("#pages").append(text);

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
                    + '<span class="badge badge-primary">'+data[dataN].postNum+'</span>'
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