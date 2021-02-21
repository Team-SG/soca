/*
    2021.02.15
    최초 작성자 : PYE
    평가방 - 평가 작성 폼 관련 JavaScript
 */

$(document).ready(function() {

    initEvaluateWrite();

    $(".star").on('click',function(){
        var idx=$(this).index();
        $(".star").removeClass("on");
        $(this).addClass("on").prevAll("span").addClass("on");
        //for(var i=0;i<=idx;i++)
         //   $(".star").eq(i).addClass("on");
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
