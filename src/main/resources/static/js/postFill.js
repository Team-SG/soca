/*
    2021.08.21
    최초 작성자 : KDB
    평가방 - 질문방 게시글 쓰기
 */
var postNum;
var type = 0;

$(document).ready(function(){
    var info = getQuery2();
    if(info.get("postNum") != null){
        postNum = parseInt(info.get("postNum"));
        type = 1;
        initPostFill();
    }

    $("#btnPostWrite").click(function(event){
        if($("#postTitle").val().length==0)
            swal("게시글의 제목을 입력해주세요.");
        else if($("#postContent").val().length==0)
            swal("게시글의 내용을 입력해주세요.");
        else{
            if(type == 0){
                var param = {
                    code: "CSE3040",
                    title: $("#postTitle").val(),
                    content: $("#postContent").val()
                }
                callPostService("/writePost",param,function(data){
                    location.href = "/postRead?postNum="+data;
                });

            }
            else if(type == 1){
                var param = {
                    postNum: postNum,
                    title: $("#postTitle").val(),
                    content: $("#postContent").val()
                }
                callPostService("/revisePost",param,null);
                location.href = "/postRead?postNum="+postNum;
            }

        }
    })
})

function initPostFill(){
    callPostService("getPostByNum", postNum, function(data){
        $("#postTitle").append(data.title);
        $("#postContent").append(data.content);
    })
}
