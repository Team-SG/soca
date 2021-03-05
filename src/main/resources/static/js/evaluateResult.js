/*
    2021.02.27
    최초 작성자 : KDB
    평가방 - 평가 결과 폼 관련 JavaScript
 */
var evaluateResult;
var subjectID;
var subject;

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
        subject=data;
        //swal(data.code);
        $("#subject").append('<strong>'+data.subjectNO+'</strong>');
        $("#professor").append(tabChar()+"-"+data.professor+" 교수님");
    });

    var param2={
        code:subject.code,
        professor:subject.professor
    }
    callPostService("/getEvaluateData",param2,function(data){
       evaluateResult=data;
    });

    for(var i=0;i<evaluateResult.evaluationAvg.toFixed(0);i++)
        $("#evaluation .star").eq(i).addClass("on");
    $("#evaluation").append('<h6> ( '+(evaluateResult.evaluationAvg/2).toFixed(2)+ ' / 5.0 )'+tabChar()+' ( '+evaluateResult.evaluationCnt+'명 참여 ) </h6>');

    for(var i=0;i<evaluateResult.qualityAvg.toFixed(0);i++)
        $("#quality .star").eq(i).addClass("on");
    $("#quality").append('<h6> ( '+(evaluateResult.qualityAvg/2).toFixed(2)+ ' / 5.0 ) </h6>');

    for(var i=0;i<evaluateResult.gradeSatisAvg.toFixed(0);i++)
        $("#gradeSatis .star").eq(i).addClass("on");
    $("#gradeSatis").append('<h6> ( '+(evaluateResult.gradeSatisAvg/2).toFixed(2)+ ' / 5.0 ) </h6>');


    $("#difficulty").append('<h6> ( '+evaluateResult.difficultyAvg.toFixed(2)+ ' / 5.0 ) </h6>');
    $("#homework").append('<h6>( '+evaluateResult.homeworkAvg.toFixed(2)+ ' / 5.0 ) </h6>');
    $("#coverage").append('<h6>( '+evaluateResult.coverageAvg.toFixed(2)+ ' / 5.0 ) </h6>');
}
