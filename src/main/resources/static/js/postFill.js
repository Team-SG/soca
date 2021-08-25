/*
    2021.08.21
    최초 작성자 : KDB
    평가방 - 질문방 게시글 쓰기
 */
var postNum;
var type = 0;
var autoData = [];
var selectItem = {
    label: "",
    code: "",
};

$(document).ready(function(){
    var info = getQuery2();
    if(info.get("postNum") != null){
        postNum = parseInt(info.get("postNum"));
        type = 1;
        initPostFill();
    }

    callPostService("getAllSubjects", 1, function(data){
        autoData = data;
    })

    autoCompletePost();

    $("#btnPostWrite").click(function(event){
        if(selectItem.label === "")
            swal("과목 검색 후 선택해주세요.");
        else if($("#postTitle").val().length === 0)
            swal("게시글의 제목을 입력해주세요.");
        else if($("#postContent").val().length === 0)
            swal("게시글의 내용을 입력해주세요.");
        else{

           if(type === 0){
                var param = {
                    code: selectItem.code,
                    title: $("#postTitle").val(),
                    content: $("#postContent").val()
                }
                callPostService("/writePost",param,function(data){
                    location.href = "/postRead?postNum="+data;
                });

            }
            else if(type === 1){
                var param = {
                    postNum: postNum,
                    title: $("#postTitle").val(),
                    content: $("#postContent").val()
                }
                callPostService("/revisePost",param,null);
                //location.href = "/postRead?postNum="+postNum;
               history.back();
            }
        }
    })
})

function initPostFill(){
    callPostService("getPostByNum", postNum, function(data){
        $("#subject").val(data.subjectNo);
        $("#postTitle").val(data.title);
        $("#postContent").val(data.content.replaceAll("<br>","\n"));
    })
}

function autoCompletePost() {
    $("#subject").autocomplete({
        disabled: false,
        source : function(request, response) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.map(autoData, function(item) {
                var testVal = item.subjectNO
                if (matcher.test(testVal)) {
                    var result = {
                        label: item.subjectNO,
                        value: item.subjectNO,
                        code: item.code,
                        major: item.major,
                        professor: item.professor,
                        subjectNO: item.subjectNO,
                        num: 1
                    }
                    return result;
                }
            }));
        },
        select : function(event, ui) {
            event.preventDefault();
            $("#subject").val(ui.item.label);
            selectItem = ui.item;
        }
    })
}