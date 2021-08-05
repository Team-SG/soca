/*
    2021.08.04
    최초 작성자 : KDB
    평가방 - 질문방 게스글 읽기
 */

var postNum;

$(document).ready(function(){
    initPostRead();

    $("#btnReplyWrite").click(function(event){
        writeReply();

    })

    $("#btnGoToList").click(function(event){
        history.back();
    })
})

function initPostRead(){
    postNum = parseInt(getQuery2().get("postNum"));
    callPostService("/getPostByNum",postNum, "callGetPostByNum");
}

function writeReply(){
    if($("#replyContent").val().length==0)
        swal("답글을 입력해주세요.");
    else{
        var param = {
            postNum : postNum,
            content : $("#replyContent").val()
        }
        callPostService("/writeReply",param, function(){
            location.href;
        })
    }

}
function callGetPostByNum(data){
    $("#postNum").append(postNum);

    var param = {
        code : data.subjectID
    };
    callPostService("getSubjectName",param,function(data2){
        $("#subjectName").append(data2.subjectNO);
    });

    $("#writer").append(data.email);
    $("#postTime").append(data.postTime);
    $("#view").append(data.view);
    $("#title").append('<strong>'+data.title+'</strong>');
    $("#content").append(data.content);
    $("#replyNum").append("답글 "+data.replyNum+"개");
}