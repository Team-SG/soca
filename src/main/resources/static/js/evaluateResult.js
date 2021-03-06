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

   $("#btnGoToList").click(function(event){
       history.back();
   });

});

function initEvaluateResult(){
    var result=getQuery2();
    subjectID=result.get("subjectID");

    var param={
        subjectID:subjectID
    }

    callPostService("/getSubjectData",param,function(data){
        subject=data;
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

/*
    $("#difficulty").append('<h6 class="ml-3"> ( '+evaluateResult.difficultyAvg.toFixed(2)+ ' / 5.0 ) </h6>');
    $("#homework").append('<h6 class="ml-3">( '+evaluateResult.homeworkAvg.toFixed(2)+ ' / 5.0 ) </h6>');
    $("#coverage").append('<h6 class="ml-3">( '+evaluateResult.coverageAvg.toFixed(2)+ ' / 5.0 ) </h6>');*/

    var difficulty=getSelectCount("difficulty");
    for(var i=0;i<5;i++){
        var percent=(difficulty[i]/evaluateResult.evaluationCnt)*100;
        var progress= '<div class="progress-bar" role="progressbar" style="width: '+percent+'%; background-color: '+getColor(i)+'" aria-valuemin="0" aria-valuemax="100">'+getMsg(i,1)+'('+percent.toFixed(0)+'%)</div>'
        $("#difficulty .progress").append(progress);
    }

    var homework=getSelectCount("homework");
    for(var i=0;i<5;i++){
        var percent=(homework[i]/evaluateResult.evaluationCnt)*100;
        var progress= '<div class="progress-bar" role="progressbar" style="width: '+percent+'%; background-color: '+getColor(i)+'" aria-valuemin="0" aria-valuemax="100">'+getMsg(i,2)+'('+percent.toFixed(0)+'%)</div>'
        $("#homework .progress").append(progress);
    }

    var coverage=getSelectCount("coverage");
    for(var i=0;i<5;i++){
        var percent=(coverage[i]/evaluateResult.evaluationCnt)*100;
        var progress= '<div class="progress-bar" role="progressbar" style="width: '+percent+'%; background-color: '+getColor(i)+'" aria-valuemin="0" aria-valuemax="100">'+getMsg(i,2)+'('+percent.toFixed(0)+'%)</div>'
        $("#coverage .progress").append(progress);
    }

}

function getSelectCount(data){
    var result;
    var param ={
        code:subject.code,
        professor:subject.professor,
        flag:data
    }
    callPostService("getSelectCount",param,function(data){
        result=data;
    });
    return result;
}

function getMsg(options,flag){
    if(flag==1){
        switch(options){
            case 0: return "매우 쉬움";
            case 1: return "쉬움";
            case 2: return "보통";
            case 3: return "어려움";
            case 4: return"매우 어려움";
        }
    }
    else{
        switch(options){
            case 0: return "매우 적음";
            case 1: return "적음";
            case 2: return "보통";
            case 3: return "많음";
            case 4: return "매우 많음";
        }
    }
}

function getColor(options){
    switch(options){
        case 0: return "#3498db";
        case 1: return "#18bc9c";
        case 2: return "#ffed00";
        case 3: return "#fd7e14";
        case 4: return "#e83e8c";
    }
}
