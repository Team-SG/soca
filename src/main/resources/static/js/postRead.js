/*
    2021.08.04
    최초 작성자 : KDB
    평가방 - 질문방 게스글 읽기
 */

$(document).ready(function(){
    initPostRead();

    $("#btnGoToList").click(function(event){
        history.back();
    })
})

function initPostRead(){
    var param = getQuery2();
    var postNum = parseInt(param.get("postNum"));
    callPostService("/getPostByNum",postNum, "callGetPostByNum");
}

function callGetPostByNum(data){
    $("#postNum").append(data.postNum);

    callPostService("getSubjectName",data.subjectID,function(data){
        $("#subjectName").append(data);
    });

    $("#writer").append(data.email);
    $("#postTime").append(data.postTime);
    $("#view").append(data.view);
    $("#title").append('<strong>'+data.title+'</strong>');
    $("#content").append(data.content);
    $("#replyNum").append("답글 "+data.replyNum+"개");
}