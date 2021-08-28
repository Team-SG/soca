/*
    2021.08.04
    최초 작성자 : KDB
    평가방 - 질문방 게시글 읽기
 */

var postNum;
var replyIdx = 0;
var postWriter;
var viewer;

$(document).ready(function(){
    initPostRead();

    $("#btnToSolved").click(function(event){
        swal({
            text: "해결된 질문은 다시 미해결 상태로 만들 수 없습니다.",
            buttons: {
                cancel : "취소",
                confirm : "확인"
            }
        }).then(function(result){
            if(result) {
                callPostService("/updateSolved",postNum,null);
                location.reload();
            }
        })
    })

    $("#btnReplyWrite").click(function(event){
        writeReply();
    })

    $("#btnGoToList").click(function(event){
        var referrer = document.referrer;
        if(referrer.indexOf("postFill") < 0)
            history.back();
        else location.href = "/postList?page=1&checked=0&type=subject&search=";
    })

    $("#accuse").on('show.bs.modal',function(event){
        var data = $(event.relatedTarget).data("test");
        var type = data.substring(0,1);
        var num = data.substring(2);
        $("#accuseType").val(type);
        $("#accuseNum").val(num);
        $('input[name="accuseReason"]:radio[value="1"]').prop("checked",true);
    })

    $("#reason1, #reason2, #reason3").click(function(event){
        $("#accuseContent").attr("disabled",true);
    })

    $("#reason4").click(function(event){
        $("#accuseContent").attr("disabled",false);
    })

    $("#btnAccuse").click(function(event){
       accuse();
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
    $("#view").append(data.viewCnt);
    $("#title").append('<strong>'+data.title+'</strong>');

    callPostService("/getViewerEmail",null,function(data){
        viewer = data.email;
    })

    var text = '';
    if(postWriter == viewer) {
        if (data.solYN)
            text += '<div class="btn btn-success disabled mr-1">해결</div>';
        else{
            text += '<button id="btnToSolved" class="btn btn-warning mr-1">미해결</button>';
            if(data.replyNum == 0) {
                text += '<button class="btn btn-primary mr-1" onClick="location.href=\'/postFill?postNum='+postNum+'\'">수정</button>';
                text += '<button class="btn btn-primary mr-1" onClick="deletePost(1,'+ postNum +')">삭제</button>';
            }
        }
    }
    else{
        if (data.solYN)
            text += '<div class="btn btn-outline-success disabled mr-1">해결</div>';
        else
            text += '<div class="btn btn-outline-warning disabled mr-1">미해결</div>';

        text += ' <button class="btn btn-danger mr-1" data-toggle="modal" data-target="#accuse" data-test="1_'+ postNum +'">신고</button>';
    }
    $("#postOption").append(text);

    if(data.accusedYN || data.delYN){
        $("#headInfo").remove();
        $(".toast-header").remove();
        $("#content").addClass("text-center");
        if(data.accusedYN)
            $("#content").append("<br><br>" + "<h5><strong>게시글이 신고 되어 일시적으로 표시할 수 없습니다.</strong></h5>" + "<br><br><br>");
        else if(data.delYN)
            $("#content").append("<br><br>" + "<h5><strong>게시글이 삭제 되었습니다.</strong></h5>" + "<br><br><br>");
        $("#mainReply").remove();
        $("#mainReplyWrite").remove();
        $("hr").remove();
        return;
    }

    $("#content").append(data.content);
    $("#replyNum").append("답글 "+data.replyNum+"개");

    callPostService("getReplies", postNum, "callGetReplies");
}

function callGetReplies(reply){
    for(var i=0;i<reply.length;i++){
        var text = '<li id="' + (++replyIdx) + '" class="list-group-item d-flex justify-content-between align-items-center">';

        if(reply[i].accusedYN){
            text += '<strong>게시글이 신고 되어 일시적으로 표시할 수 없습니다.</strong>'
                    + '</li>';
        }
        else if(reply[i].delYN){
            text += '<strong>게시글이 삭제 되었습니다.</strong>'
                + '</div></li>';
        }
        else{
            if(postWriter == reply[i].email){
                text += '<div style="color:#e74c3c">' + reply[i].content + '</div>'
                    + '<div class="d-flex justify-content-center align-items-center">'
                    + '<div class="mr-1" style="color:#e74c3c"> [글쓴이] </div>';
            }
            else{
                text += '<div>'+ reply[i].content + '</div>'
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
                + '<a id="writeRereply' + reply[i].replyNum + '" class="dropdown-item fs-090" onClick="replyClick(this.id,' + replyIdx+','+reply[i].rereplyCnt + ')">답글 달기</a>';
            if(viewer == reply[i].email)
                text += '<a class="dropdown-item fs-090" onClick="deletePost(2,'+ reply[i].replyNum +')">삭제하기</a>';
            else
                text += '<a class="dropdown-item fs-090" data-toggle="modal" data-target="#accuse" data-test="2_'+ reply[i].replyNum +'">신고하기</a>';
            text += '</div>';
            text += '</div></div></li>';
        }


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

        if(rereply[i].accusedYN){
            text += '<strong>게시글이 신고 되어 일시적으로 표시할 수 없습니다.</strong>'
                + '</div></li>';
        }
        else if(rereply[i].delYN){
            text += '<strong>게시글이 삭제 되었습니다.</strong>'
                + '</div></li>';
        }
        else {
            if (postWriter == rereply[i].email) {
                text += '<div style="color:#e74c3c">' + rereply[i].content + '</div></div>'
                    + '<div class="d-flex justify-content-center align-items-center">'
                    + '<div class="mr-1" style="color:#e74c3c"> [글쓴이] </div>';
            } else {
                text += '<div>' + rereply[i].content + '</div></div>'
                    + '<div class="d-flex justify-content-center align-items-center">'
                    + '<div class="mr-1"> [' + rereply[i].nickname + '] </div>';
            }

            text += '<div> [' + rereply[i].postTime + '] </div>'
                + '<div class="dropdown">'
                + '<a class="ml-2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16" style="color:#868e96">'
                + '<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>'
                + '</svg></a>'
                + '<div class="dropdown-menu" style="text-align: center; min-width: 5rem;">';
            if(viewer == rereply[i].email)
                text += '<a class="dropdown-item fs-090" onClick="deletePost(3,'+ rereply[i].rereplyNum +')">삭제하기</a>';
            else
                text += '<a class="dropdown-item fs-090" data-toggle="modal" data-target="#accuse" data-test="3_' + rereply[i].rereplyNum + '">신고하기</a>';
            text += '</div>'
                + '</div></div></li>';
        }
    }
    $("#"+start).after(text);
}

function accuse(){
    var type = $("#accuseType").val();
    var num = $("#accuseNum").val();
    var reason = $('input[name="accuseReason"]:checked').val();
    var text = "";
    if(reason=="4") {
        text = $("#accuseContent").val();
        if(text.length==0){
            swal("신고 내용을 입력해주세요.");
            return;
        }
    }
    else text = $('label[for="reason'+ reason +'"]').text();
    var param = {
        type : type,
        postNum : num,
        content : text
    }

    callPostService("accuse",param,null);
    location.reload();
}

function deletePost(type, postNum){
    swal({
        text: "삭제하면 복원할 수 없습니다.",
        buttons: ["취소","확인"]
    }).then(function(result){
        if(result){
            var param = {
                type : type,
                postNum : postNum
            }
            callPostService("/deletePost", param, null);
            location.reload();
        }
    })

}