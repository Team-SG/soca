$(document).ready(function() {
    //console.log(location.search)
    //console.log($("#code").val());
    var param = getQuery();
    callPostService("findSelected", param, function(data){
        if(data.length == 0 ) {
            var text = "작성된 강의평가가 없습니다."
            $("#selectedEval").append(text);
        }

        showEval(1, data);
        paging(1, data);
    });
})

function paging(currentPage, data) {
    let dataLength = data.length;
    let dataPerPage = 10;
    let pageCount = 5;
    let totalPage = Math.ceil(dataLength / dataPerPage); // 한 페이지 10개 가정
    let pageGroup = Math.ceil(currentPage / pageCount); // 페이지 번호 5개
    let lastPage = pageGroup * pageCount;
    if(lastPage > totalPage)
        lastPage = totalPage;
    let firstPage = lastPage - (pageCount - 1);
    if(firstPage < 1)
        firstPage = 1;

    let next = lastPage + 1;
    let prev = firstPage - 1;

    let text = "";

    if(prev > 0)
        text += "<li><a href='#' id='prev'> < </a></li>";

    for(let i = firstPage; i <= lastPage; i++) {
        text += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
    }

    if(lastPage < totalPage)
        text += "<a href='#' id='next'> > </a>";

    $("#pages").html(text);
    $("#pages a#" + currentPage).css("color", "black");

    $("#pages a").click(function() {
        let $id = $(this).attr("id");
        let selectedPage = $(this).text();

        if($id == "next")
            selectedPage = next;
        if($id == "prev")
            selectedPage = prev;

        paging(selectedPage, data);
        showEval(selectedPage, data);
    })
}

function showEval(currentPage, data) {
    let dataPerPage = 10;
    let first = (currentPage - 1) * dataPerPage;
    let last;
    if(currentPage == Math.floor(data.length / dataPerPage) + 1)
        last = first + data.length % dataPerPage;
    else
        last = first + dataPerPage

    var text = ""
    for(var dataN = first; dataN < last; dataN++) {
        var param = {
            subjectID: data[dataN].subjectID
        }
        callPostService("getSubjectData", param, function (data2) {
            text += '<li class="list-group-item justify-content-between align-items-left pt-2 pb-2 pl-3 pr-3">'
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
                + '<span class="ml-3" style="color:#000000">' + data[dataN].commentFinal + '</span>'
                + '</li>'

           ;
        })
    }
    // 삽입
    $("#selectedEval").html(text)
}