/*
    2021.02.27
    최초 작성자 : KDB
    평가방 - 평가 결과 폼 관련 JavaScript
 */
var evaluateResult;
var subjectID;
var isRecommended;

$(document).ready(function() {
   initEvaluateResult();

});

function initEvaluateResult(){
    var result=getQuery2();
    subjectID=result.get("subjectID");

    var param={
        subjectID:subjectID
    }

    callPostService("/getSubjectData",param,function(data){
        $("#subject").append('<strong>'+data.subjectNO+'</strong>');
        $("#professor").append(tabChar()+"-"+data.professor+" 교수님");
    });

    callPostService("/getEvaluationData",null,function(data){
        swal(""+data);
    })
}
