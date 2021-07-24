/*
    2021.02.27
    최초 작성자 : KDB
    평가방 - 메인 화면 관련 Javascript
 */

$(document).ready(function() {
    getNewEvaluateResult();
});

// ================================ Custom Function ================================

// 수강년도 및 학기 데이터 가져오기
function getNewEvaluateResult() {
    callPostService('getRecentEval', null, function(data){
        for(var dataN=data.length-1 ; dataN>=data.length-5 ;dataN--){
            if(dataN<0) break;
            var param = {
                subjectID: data[dataN].subjectID
            }
            callPostService("getSubjectData", param, function (data2) {
                var text = '<a href="\evaluateComplete?postNum='+data[dataN].postNum+'&subjectID='+data[dataN].subjectID+'" className="p-1" style="color:#000000; display: block">'
                    + '<span className="badge badge-danger fs-090 mr-1">N</span>'
                    + '<span>'+ data2.subjectNO + ' - ' + data2.professor+'</span>'
                    + '</a>';

                // 삽입
                $("#mainRecentEval").append(text);
            })
        }

    })
}