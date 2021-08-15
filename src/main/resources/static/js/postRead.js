/*
    2021.08.04
    최초 작성자 : KDB
    평가방 - 질문방 게스글 읽기
 */

var postNum;
var replyIdx = 0;
var postWriter;
var viewer;

$(document).ready(function(){
    initPostRead();

    $("#btnUnsolved").click(function(event){
        callPostService("/updateSolved",postNum,null);
        location.reload();
    })

    $("#btnReplyWrite").click(function(event){
        writeReply();
    })

    $("#btnGoToList").click(function(event){
        history.back();
    })

    $("#reason1, #reason2, #reason3").click(function(event){
        $("#accuseContent").attr("disabled",true);
    })

    $("#reason4").click(function(event){
        $("#accuseContent").attr("disabled",false);
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
        callPostService("/writeReply",param, null);
        location.reload();
    }
}

function replyClick(id, index, offset){
    $("#writeRereply").remove();
    var replyNum=id.substring(12);
    var text = '<li id="writeRereply" class="list-group-item d-flex justify-content-between align-items-center">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-right mr-2" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>'
                + '</svg>'
                + '<textarea id="rereplyContent" class="d-block" style="border:1px solid #dddddd; width:90%; height:40px;resize:none"></textarea>'
                + '<button type="button" id="btnRereplyWrite" class="btn btn-primary font-weight-normal ml-2">작성</button>'
                + '</li>';

    $("#"+(index+offset)).after(text);

    $("#btnRereplyWrite").click(function(){
        if($("#rereplyContent").val().length==0){
            swal("내용을 입력해 주세요.");
        }
        else{
            var param={
                postNum:postNum,
                replyNum:replyNum,
                content:$("#rereplyContent").val()
            }
            callPostService("/writeRereply",param,null);
            location.reload();
        }
    })
}

function callGetPostByNum(data){
    postWriter = data.email;

    $("#postNum").append(postNum);
    $("#subjectName").append(data.subjectNo);
    $("#writer").append(data.nickname);
    $("#postTime").append(data.postTime);
    $("#view").append(data.view);
    $("#title").append('<strong>'+data.title+'</strong>');

    callPostService("/getViewerEmail",null,function(data){
        viewer = data.email;
    })

    var text = '';
    if(postWriter == viewer) {
        if (data.solYN)
            text += '<div class="btn btn-success disabled mr-1">해결</div>';
        else
            text += '<button id="btnUnsolved" class="btn btn-warning mr-1">미해결</button>';
    }
    else{
        if (data.solYN)
            text += '<div class="btn btn-outline-success disabled mr-1">해결</div>';
        else
            text += '<div class="btn btn-outline-warning disabled mr-1">미해결</div>';
    }
    text += ' <button id="btnAccuse" class="btn btn-danger mr-1">신고</button>';
    $("#postOption").append(text);

    $("#content").append(data.content);
    $("#replyNum").append("답글 "+data.replyNum+"개");

    callPostService("getReplies", postNum, "callGetReplies");
}

function callGetReplies(reply){
    for(var i=0;i<reply.length;i++){
        var text = '<li id="' + (++replyIdx) + '" class="list-group-item d-flex justify-content-between align-items-center">';

        if(postWriter == reply[i].email){
            text += '<div style="color:#e74c3c">' +replyIdx+' '+ reply[i].content + '</div>'
                + '<div class="d-flex justify-content-center align-items-center">'
                + '<div class="mr-1" style="color:#e74c3c"> [글쓴이] </div>';

        }
        else{
            text += '<div>' +replyIdx+' '+ reply[i].content + '</div>'
                + '<div class="d-flex justify-content-center align-items-center">'
                + '<div class="mr-1"> ['+ reply[i].nickname + '] </div>';
        }

        text += '<div> ['+ reply[i].postTime + '] </div>';
        text += '<div class="dropdown">';
        text += '<a class="ml-2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16" style="color:#868e96">'
                + '<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>'
                + '</svg></a>';
        text += '<div class="dropdown-menu" style="text-align: center; min-width: 5rem;">'
                + '<a id="writeRereply' + reply[i].replyNum + '" class="dropdown-item fs-090" onClick="replyClick(this.id,' + replyIdx+','+reply[i].rereplyCnt + ')">답글 달기</a>'
                + '<a class="dropdown-item fs-090" data-toggle="modal" data-target="#accuse">신고하기</a>'
                + '</div>';
        text += '</div></div></li>';

        $("#reply").append(text);

        callPostService("/getRereplies",reply[i].replyNum,"callGetRereplies");
    }

}
function callGetRereplies(rereply){
    var start = replyIdx;
    var text = '';
    for(var i = 0;i < rereply.length;i++){
        text += '<li id="' + (++replyIdx) + '" class="list-group-item d-flex justify-content-between align-items-center">'
                + '<div class="d-flex justify-content-center align-items-center">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-right mr-2" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>'
                + '</svg>';

        if(postWriter == rereply[i].email){
            text += '<div style="color:#e74c3c">' + replyIdx+' '+rereply[i].content + ' '+rereply[i].rereplyNum+ '</div></div>'
                + '<div class="d-flex justify-content-center align-items-center">'
                + '<div class="mr-1" style="color:#e74c3c"> [글쓴이] </div>';
        }
        else{
            text += '<div>' + replyIdx+' '+rereply[i].content + ' '+rereply[i].rereplyNum+ '</div></div>'
                + '<div class="d-flex justify-content-center align-items-center">'
                + '<div class="mr-1"> ['+ rereply[i].nickname + '] </div>';
        }

        text += '<div> ['+ rereply[i].postTime + '] </div>'
                + '<div class="dropdown">'
                + '<a class="ml-2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16" style="color:#868e96">'
                + '<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>'
                + '</svg></a>'
                + '<div class="dropdown-menu" style="text-align: center; min-width: 5rem;">'
                + '<a class="dropdown-item fs-090" data-toggle="modal" data-target="#accuse">신고하기</a>'
                + '</div>'
                + '</div></div></li>';
    }
    $("#"+start).after(text);
}
