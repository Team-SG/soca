/*
    2021.02.27
    최초 작성자 : KDB
    평가방 - 메인 화면 관련 Javascript
 */

$(document).ready(function() {
    getNewEvaluateResult();
    getFavorite();
    getMainPost();
});

// ================================ Custom Function ================================

// 수강년도 및 학기 데이터 가져오기
function getNewEvaluateResult() {
    var param={
        offset : 0,
        num : 5
    }
    callPostService('getRecentEval', param, function(data){
        for(var dataN=0 ; dataN<data.length ;dataN++){
           // if(dataN<0) break;
            var param = {
                subjectID: data[dataN].subjectID
            }
            callPostService("getSubjectData", param, function (data2) {
                var text = '<a href="\evaluateComplete?postNum='+data[dataN].postNum+'&subjectID='+data[dataN].subjectID+'" class="p-1" style="color:#000000; display: block">'
                    + '<span class="badge badge-danger fs-090 mr-1">N</span>'
                    + '<span>'+ data2.subjectNO + ' - ' + data2.professor+'</span>'
                    + '</a>';

                // 삽입
                $("#mainRecentEval").append(text);
            })
        }
    })
}

function getFavorite() {
    callPostService('getFavoriteSub', null, function(data){
        sessionStorage.setItem("state", 1);
        for(let dataN=0; dataN<5; dataN++) {
            let goSelectedEval = 'evaluateSelected?code=' + data[dataN].code + '&professor=' + data[dataN].professor +'&page=1';
            let text = '<a href=' + goSelectedEval +  ' class="p-1" style="color:#000000; display: block">'
                + '<span class="badge badge-warning fs-090 mr-1">' + (dataN + 1) +'</span>'
                + '<span>' + data[dataN].professor + '-' + data[dataN].subjectNO +'</span>'
                + '</a>';

            $("#mainEvalSub").append(text);
        }
    })

    callPostService('getFavoriteProf', null, function(data){
        for(let dataN=0; dataN<5; dataN++) {
            let goSelectedEval = 'evaluateSelected?code=' + '&professor=' + data[dataN] +'&page=1';
            let text = '<a href=' + goSelectedEval + ' class="p-1" style="color:#000000; display: block">'
                + '<span class="badge badge-success fs-090 mr-1">' + (dataN + 1) + '</span>'
                + '<span>' + data[dataN] + '</span>'
                + '</a>';
            $("#mainEvalProf").append(text);
        }
    })
}

function getMainPost() {
    callPostService('getMainPost', null, function(data){
        for(let dataN=0; dataN<data.length; dataN++) {
            let goSelectedPost = 'postRead?postNum=' + data[dataN].postNum;
            let text = '<li class="list-group-item justify-content-between align-items-left pt-2 pb-2 pl-3 pr-3">'
                + '<span class="badge badge-primary">New</span>'
                + '<a href=' + goSelectedPost + ' class="ml-2 mr-2" style="color:#000000">' + data[dataN].title + ' - ' + data[dataN].subjectNo + '</a>'
                + '<div class="float-right">'
                + '<ion-icon name="eye-outline"></ion-icon><span class="p-1">' + data[dataN].viewCnt +'</span>'
                + '<ion-icon name="chatbubble-ellipses-outline"></ion-icon><span class="p-1">' + data[dataN].replyNum + '</span>'
                + '</div>'
                + '</li>';
            $("#mainPost").append(text);
        }
    })
}