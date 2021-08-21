/*
    2021.08.21
    최초 작성자 : KDB
    평가방 - 질문방 게시글 쓰기
 */

$(document).ready(function(){
    $("#btnPostWrite").click(function(event){
        if($("#postTitle").val().length==0)
            swal("게시글의 제목을 입력해주세요.");
        else if($("#postContent").val().length==0)
            swal("게시글의 내용을 입력해주세요.");
        else{
            var param = {
                code: "REL3001",
                title: $("#postTitle").val(),
                content: $("#postContent").val()
            }

            callPostService("/writePost",param,null);
        }
    })
})