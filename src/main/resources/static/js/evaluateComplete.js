/*
    2021.02.24
    최초 작성자 : KDB
    평가방 - 평가 완료 폼 관련 JavaScript
 */
var evaluateResult;
var subjectID;
var isRecommended;
var postNum;

$(document).ready(function() {
    initEvaluateComplete();

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

function initEvaluateComplete(){
    var result=getQuery2();
    subjectID=result.get("subjectID");

    var param={
        subjectID : subjectID
    };

    callPostService('/getSubjectData',param,function(data){
        $("#subject").append('<strong>'+data.subjectNO+'</strong>');
        $("#professor").append(tabChar()+"-"+data.professor+" 교수님");
    });

    if(result.has("postNum")){
        postNum=result.get("postNum");
        var par={
            postNum : parseInt(postNum)
        }
        callPostService("getEvalCompleteByPostNum",par,function(data){
            evaluateResult=data;
        })
    }
    else{
        callPostService("/getEvaluateComplete",param,function(data){
            evaluateResult=data;
        })
    }


    $("#grade").append(evaluateResult.grade);
    $("#commentFinal").append(evaluateResult.commentFinal)
    $("#commentTest").append(evaluateResult.commentTest);

    getTestData();

    //일단 간단히 할 방법을 못찾아서 되게끔만 해놨어요
    for(var i=0;i<evaluateResult.evaluation;i++)
        $("#evaluation .star").eq(i).addClass("on");
    $("#evaluation").append('<h6>( '+(evaluateResult.evaluation/2).toFixed(1)+' / 5.0 )</h6>');

    for(var i=0;i<evaluateResult.quality;i++)
        $("#quality .star").eq(i).addClass("on");
    $("#quality").append('<h6>( '+(evaluateResult.quality/2).toFixed(1)+' / 5.0 )</h6>');

    for(var i=0;i<evaluateResult.gradeSatis;i++)
        $("#gradeSatis .star").eq(i).addClass("on");
    $("#gradeSatis").append('<h6>( '+(evaluateResult.gradeSatis/2).toFixed(1)+' / 5.0 )</h6>');

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
    isRecommended = data;
    if(data==true){
       // $("#btnRecommend").removeClass("btn-outline-danger");
       // $("#btnRecommend").addClass("btn-danger");
       /* $("#btnRecommend").val(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
            <path
                d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
        </svg>);*/
    }
    else{
        //$("#btnRecommend").removeClass("btn-danger");
        //$("#btnRecommend").addClass("btn-outline-danger");
        /*$("#btnRecommend").val(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="bi bi-suit-heart" viewBox="0 0 16 16">
            <path
                d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
        </svg>);*/
    }
}

function callRecommendOrNot(data) {
    callIsRecommended(data);
    if (data == true) evaluateResult.recommendNum = evaluateResult.recommendNum + 1;
    else evaluateResult.recommendNum = evaluateResult.recommendNum - 1;
}