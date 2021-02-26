/*
    2021.02.15
    최초 작성자 : KDB
    평가방 - 평가 완료 폼 관련 JavaScript
 */
var evaluateResult;
var subjectID;
var isRecommended;

$(document).ready(function() {
    initEvaluateResult();

    $("#btnGoToList").click(function(event){
        history.back();
    })

    $("#btnRecommend").click(function(event){
        var param={
            postNum: evaluateResult.postNum,
            isRecommended: isRecommended,
            recommendNum:evaluateResult.recommendNum
        }
        callPostService("/RecommendOrNot",param,'callRecommendOrNot');
    })

});

function initEvaluateResult(){
    var result=getQuery2();
    subjectID=result.get("subjectID");


    var param={
        subjectID : subjectID
    };

    callPostService('/getSubjectData',param,function(data){
        $("#subject").append('<strong>'+data.subjectNO+'</strong>');
        $("#professor").append(tabChar()+"-"+data.professor+" 교수님");
    });

    callPostService("/getEvaluateResult",param,function(data){
        evaluateResult=data;

    })

    $("#grade").append(evaluateResult.grade);
    $("#commentFinal").append(evaluateResult.commentFinal)
    $("#commentTest").append(evaluateResult.commentTest);

    getTestData();

    //일단 간단히 할 방법을 못찾아서 되게끔만 해놨어요
    for(var i=0;i<evaluateResult.evaluation;i++)
        $("#evaluation .star").eq(i).addClass("on");
    $("#evaluation").append('<h6 id="evaluationValue">( '+(evaluateResult.evaluation/2).toFixed(1)+' / 5.0 )</h6>');

    for(var i=0;i<evaluateResult.quality;i++)
        $("#quality .star").eq(i).addClass("on");
    $("#quality").append('<h6 id="evaluationValue">( '+(evaluateResult.quality/2).toFixed(1)+' / 5.0 )</h6>');

    for(var i=0;i<evaluateResult.gradeSatis;i++)
        $("#gradeSatis .star").eq(i).addClass("on");
    $("#gradeSatis").append('<h6 id="evaluationValue">( '+(evaluateResult.gradeSatis/2).toFixed(1)+' / 5.0 )</h6>');

    $("#diff"+evaluateResult.difficulty).attr("checked",true);
    $("input[name=difficulty]").attr("disabled",true);

    $("#home"+evaluateResult.homework).attr("checked",true);
    $("input[name=homework]").attr("disabled",true);

    $("#cover"+evaluateResult.coverage).attr("checked",true);
    $("input[name=coverage]").attr("disabled",true);


    var param2={
        postNum: evaluateResult.postNum,
    }
    callPostService("/isRecommended",param2,'callIsRecommended')

}

function getTestData(){
    var header='<div class="d-flex align-items-center input-group ml-3 mt-2 mb-3" style="height:32px">'
    var score= '<h6 class="ml-3">내 점수:</h6>\n'
    var average= '<h6 class="ml-3">평균:</h6>\n'
    var rank= '<h6 class="ml-3">등수:</h6>\n'

    //일단 간단히 할 방법을 못찾아서 되게끔만 해놨어요
    var testNum=evaluateResult.testNum;
    for(var i=1;i<=testNum;i++){
        var context="";
        if(i==1){
            context= header+ '<h6>'+i+'차 &nbsp; </h6>'+
                score + '<textarea class="form-control ml-2" id="score'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.score1+'</textarea>'+
                average + '<textarea class="form-control ml-2" id="average'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.average1+'</textarea>'+
                rank + '<textarea class="form-control ml-2" id="rank'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.rank1+'</textarea></div>';
        } else if(i==2){
            context= header+ '<h6>'+i+'차 &nbsp; </h6>'+
                score + '<textarea class="form-control ml-2" id="score'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.score2+'</textarea>'+
                average + '<textarea class="form-control ml-2" id="average'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.average2+'</textarea>'+
                rank + '<textarea class="form-control ml-2" id="rank'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.rank2+'</textarea></div>';
        } else if(i==3){
            context= header+ '<h6>'+i+'차 &nbsp; </h6>'+
                score + '<textarea class="form-control ml-2" id="score'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.score3+'</textarea>'+
                average + '<textarea class="form-control ml-2" id="average'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.average3+'</textarea>'+
                rank + '<textarea class="form-control ml-2" id="rank'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.rank3+'</textarea></div>';
        } else{
            context= header+ '<h6>'+i+'차 &nbsp; </h6>'+
                score + '<textarea class="form-control ml-2" id="score'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.score4+'</textarea>'+
                average + '<textarea class="form-control ml-2" id="average'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.average4+'</textarea>'+
                rank + '<textarea class="form-control ml-2" id="rank'+i+'" style="height: 38px; text-align:center; resize:none; outline-style: none;" readonly>'+evaluateResult.rank4+'</textarea></div>';
        }
        $("#testData").append(context);
    }
}

function callIsRecommended(data){
    isRecommended=data;
    if(data==true){
        $("#btnRecommend").removeClass("btn-outline-danger");
        $("#btnRecommend").addClass("btn-danger");
    }
    else{
        $("#btnRecommend").removeClass("btn-danger");
        $("#btnRecommend").addClass("btn-outline-danger");
    }
}

function callRecommendOrNot(data){
    callIsRecommended(data);
    if(data==true) evaluateResult.recommendNum=evaluateResult.recommendNum+1;
    else evaluateResult.recommendNum=evaluateResult.recommendNum-1;
}