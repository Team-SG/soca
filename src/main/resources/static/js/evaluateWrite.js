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
    $("#subject").append('<strong>'+result.get('subjectNo')+'</strong>');
    $("#professor").append(tabChar()+"-"+result.get('professor')+" 교수님");

}
