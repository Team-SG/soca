/*
    2021.02.15
    최초 작성자 : KDB
    평가방 - 평가 완료 폼 관련 JavaScript
 */
var evaluateResult;
var subjectID;

$(document).ready(function() {
    initEvaluateWrite();

    $('#evaluation .starPoint span').click(function(){
        $(this).parent().children('span').removeClass('on');
        $(this).addClass('on').prevAll('span').addClass('on');
        $("#evaluation").val($(this).index()+1);
        var value=(($(this).index()+1)/2).toFixed(1);
        $("#evaluationValue").remove();
        $("#evaluation").append('<h6 id="evaluationValue">( '+value+' / 5.0 )</h6>');
    });

    $('#quality .starPoint span').click(function(){
        $(this).parent().children('span').removeClass('on');
        $(this).addClass('on').prevAll('span').addClass('on');
        $("#quality").val($(this).index()+1);
        var value=(($(this).index()+1)/2).toFixed(1);
        $("#qualityValue").remove();
        $("#quality").append('<h6 id="qualityValue">( '+value+' / 5.0 )</h6>');
    });

    $('#gradeSatis .starPoint span').click(function(){
        $(this).parent().children('span').removeClass('on');
        $(this).addClass('on').prevAll('span').addClass('on');
        $("#gradeSatis").val($(this).index()+1);
        var value=(($(this).index()+1)/2).toFixed(1);
        $("#gradeSatisValue").remove();
        $("#gradeSatis").append('<h6 id="gradeSatisValue">( '+value+' / 5.0 )</h6>');
    });

    $("#testNum").change(function(event){
        getTestData();
    });

    $("#btnEvaluateWriteSave").click(function(event){
        if($("#commentFinal").val().length<10)
            swal("강의 평가를 10자 이상 작성해 주세요!");
        else saveEvaluateWrite();
    })

});

function initEvaluateWrite(){
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

    //
    $("#commentFinal").append(evaluateResult.commentFinal);
    getTestData();
    $("#evaluation").val(1);
    $("#quality").val(1);
    $("#gradeSatis").val(1);


}

function saveEvaluateWrite(){

    swal('평가를 완료하면 수정/삭제 하실 수 없습니다.' ,{
        closeOnClickOutside : false,
        buttons:["취소","확인"],
    }).then((result)=>{
        if(result) {
            var param={
                subjectID: subjectID,
                evaluation: $("#evaluation").val(),
                grade: $("#grade").val(),
                quality: $("#quality").val(),
                gradeSatis: $("#gradeSatis").val(),
                difficulty: $('input[name="difficulty"]:checked').val(),
                homework: $('input[name="homework"]:checked').val(),
                coverage: $('input[name="coverage"]:checked').val(),
                testNum: $("#testNum").val().valueOf(),
                score1 :$("#score1").val(),score2 :$("#score2").val(),score3 :$("#score3").val(),score4 :$("#score4").val(),
                average1 :$("#average1").val(),average2 :$("#average2").val(),average3 :$("#average3").val(),average4 :$("#average4").val(),
                rank1 :$("#rank1").val(),rank2 :$("#rank2").val(),rank3 :$("#rank3").val(),rank4 :$("#rank4").val(),
                commentFinal: $("#commentFinal").val(),
                commentTest: $("#commentTest").val()
            }
            callPostService("/saveEvaluateWrite",param,null);
            location.replace("/myEvaluate");
        }
    })
}

function getTestData(){
    var header='<div class="d-flex align-items-center input-group ml-3 mt-3 mb-3" style="height:32px">'
    var score= '<h6 class="ml-3">내 점수:</h6>\n'
    var average= '<h6 class="ml-3">평균:</h6>\n'
    var rank= '<h6 class="ml-3">등수:</h6>\n'

    var testNum=evaluateResult.testNum;
    for(var i=1;i<=testNum;i++){
        var context= header+ '<h6>'+i+'차 &nbsp; </h6>'+
            score + '<textarea class="form-control ml-2" id="score'+i+'" style="height: 38px; text-align:center; resize:none" readonly>'+evaluateResult.score1+'</textarea>'+
            average + '<textarea class="form-control ml-2" id="average'+i+'" style="height: 38px; text-align:center; resize:none" readonly>'+evaluateResult.average1+'</textarea>'+
            rank + '<textarea class="form-control ml-2" id="rank'+i+'" style="height: 38px; text-align:center; resize:none" readonly>'+evaluateResult.rank1+'</textarea></div>';
        $("#testData").append(context);
    }
}