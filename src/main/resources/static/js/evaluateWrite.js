/*
    2021.02.15
    최초 작성자 : PYE
    평가방 - 평가 작성 폼 관련 JavaScript
 */
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

        var header='<div class="d-flex align-items-center input-group ml-3 mt-3 mb-3" style="height:32px">'
        var score= '<h6 class="ml-3">내 점수:</h6>\n'
        var average= '<h6 class="ml-3">평균:</h6>\n'
        var rank= '<h6 class="ml-3">등수:</h6>\n'

        $("#testData").empty();
        var testNum=$("#testNum").val().valueOf();
        //swal(""+testNum);
        for(var i=1;i<=testNum;i++){
            var context= header+ '<h6>'+i+'차 &nbsp; </h6>'+
                score + '<input type="text" class="form-control ml-2" id="score'+i+'" style="width:10px; text-align:center">'+
                average + '<input type="text" class="form-control ml-2" id="average'+i+'" style="width:10px; text-align:center">'+
                rank + '<input type="text" class="form-control ml-2" id="rank'+i+'" style="width:10px; text-align:center"></div>';
            $("#testData").append(context);
        }
    });

    $("#btnEvaluateWriteSave").click(function(event){
        /*swal($("#evaluation").val()+" "+$("#grade").val()+" "+$("#quality").val()+" "+
            $("#gradeSatis").val()+" "+$('input[name="difficulty"]:checked').val()+" "+
            $('input[name="homework"]:checked').val()+" "+$('input[name="coverage"]:checked').val()+" "+
            $("#testNum").val());*/
        //swal($("#score1").val()+"  "+$("#average1").val()+"  "+$("#score2").val());
        if($("#commentFinal").val().length<10)
            swal("강의 평가를 10자 이상 작성해 주세요!");
        //swal(""+$("#commentFinal").val().length)
        saveEvaluateWrite();
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

    $("#evaluation").val(1);
    $("#quality").val(1);
    $("#gradeSatis").val(1);
    $("#difficulty").val($('input[name="difficulty"]:checked').val());
    $("#homework").val($('input[name="homework"]:checked').val());
    $("#coverage").val($('input[name="coverage"]:checked').val());


}

function saveEvaluateWrite(){

    swal('평가를 완료하면 수정하실 수 없습니다.' ,{
        closeOnClickOutside : false,
        buttons:["취소","확인"],
    }).then((result)=>{
        if(result) {
            swal("여기까지");
            //아직 작동안함
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
                score1 :$("#score1").val().valueOf(),score2 :$("#score2").val().valueOf(),score3 :$("#score3").val().valueOf(),score4 :$("#score4").val().valueOf(),
                average1 :$("#average1").val().valueOf(),average2 :$("#average2").val().valueOf(),average3 :$("#average3").val().valueOf(),average4 :$("#average4").val().valueOf(),
                rank1 :$("#rank1").val().valueOf(),rank2 :$("#rank2").val().valueOf(),rank3 :$("#rank3").val().valueOf(),rank4 :$("#rank4").val().valueOf(),
                commentFinal: $("#commentFinal").val(),
                commentTest: $("#commentTest").val()
            }
            callPostService("/saveEvaluateWrite",param,function(){
                swal("저장을 완료했습니다.");
            })
        }

    })
}