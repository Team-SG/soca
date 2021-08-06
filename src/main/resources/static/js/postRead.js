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
        location.reload();
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
            location.reload();
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

    $("#writer").append(data.nickname);
    $("#postTime").append(data.postTime);
    $("#view").append(data.view);
    $("#title").append('<strong>'+data.title+'</strong>');
    $("#content").append(data.content);
    $("#replyNum").append("답글 "+data.replyNum+"개");

    callPostService("getReplies", postNum, "callGetReplies");
}

function callGetReplies(data){
    for(var i=0;i<data.length;i++){
        var text = '<li class="list-group-item d-flex justify-content-between align-items-center">';
        text += '<div>' + data[i].content + '</div>';
        text += '<div class="d-flex justify-content-center">';
        text += '<div class="mr-1"> ['+ data[i].nickname + '] </div>';
        text += '<div> ['+ data[i].replyTime + '] </div>';
        text += '<div class="dropdown">';
        text += '<button class="btn btn-link btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
        text += /*'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical ml-2" viewBox="0 0 16 16" style="color:#868e96">'
                + '<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>'

            + '</svg>'*/
            + ' '
            + '</button>'
            + '<div class="dropdown-menu">'
            + '<a class="dropdown-item fs-090">답글 달기</a>'
            + '<a class="dropdown-item fs-090">신고하기</a>'
            + '</div>'
    +'</div></div></li>';

        $("#reply").append(text);
    }
}
