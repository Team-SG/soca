/*
    2021.02.15
    최초 작성자 : PYE
    평가방 - 평가 작성 폼 관련 JavaScript
 */

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
});

function initEvaluateWrite(){
    var result=getQuery2();
    var subjectID=result.get("subjectID");


    var param={
        subjectID : subjectID
    };

    callPostService('/getSubjectData',param,function(data){
        $("#subject").append('<strong>'+data.subjectNO+'</strong>');
        $("#professor").append(tabChar()+"-"+data.professor+" 교수님");
    });
}

