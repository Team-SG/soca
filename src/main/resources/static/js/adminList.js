$(document).ready(function() {
    let param = getQuery();


    if(param.state === "1") {
        let accuseData = {};
        let text = ""
        $("#adminListHeader").append('<small id="accuseNum"> [신고 번호] </small>' + '<small id="accuseWhy"> [신고 사유] </small>')
        callPostService('getAccuseSelected', parseInt(param.num), function(data){
            if (data.handleYN === true)
                text += '<div class="btn btn-success disabled mr-1">처리완료</div>';
            else
                text += '<button id="btnToSolved" class="btn btn-warning mr-1">미처리</button>';

            $("#btnHandle").append(text);
            $("#accuseWhy").append(data.content);

            if(data.types === 1) {
                callPostService('getPostByNum', parseInt(param.num), function(data2){accuseData = data2;})
            }
            else if(data.types === 2){
                callPostService('getReplies', parseInt(param.num), function(data2){accuseData = data2;})
            }
            else {
                callPostService('getRereplies', parseInt(param.num), function(data2){accuseData = data2;})
            }

            if(data.types !== 3) {
                $("#writer").append(accuseData.nickname);
                $("#postTime").append(accuseData.postTime);
                $("#goLink").append("<a href='/postRead?postNum=" + accuseData.postNum +"'>게시글로 이동</a>")
                $("#content").append(accuseData.content);
                $("#accuseNum").append(accuseData.postNum);
            }
            else {
                $("#writer").append(accuseData[0].nickname);
                $("#postTime").append(accuseData[0].postTime);
                $("#goLink").append("<a href='/postRead?postNum=" + accuseData[0].postNum +"'>게시글로 이동</a>")
                $("#content").append(accuseData[0].content);
                $("#accuseNum").append(accuseData[0].postNum);
            }
        });


        $("#btnToSolved").click(function(event){
            swal({
                text: "처리하시겠습니까?",
                buttons: {
                    cancel : "취소",
                    confirm : "확인"
                }
            }).then(function(result){
                if(result) {
                    callPostService("/updateAccuse", parseInt(param.num),null);
                    location.reload();
                }
            })
        })
    }
    else if(param.state === "2") {
        $("#adminListHeader").append('<small id="askNum"> 문의 번호 </small>')
        let text = "";
        callPostService('getAskSelected', parseInt(param.num), function(data){
            if (data.handleYN === true)
                text += '<div class="btn btn-success disabled mr-1">처리완료</div>';
            else
                text += '<button id="btnToSolved" class="btn btn-warning mr-1">미처리</button>';

            $("#btnHandle").append(text);
            $("#askNum").append(data.askNum);
            $("#writer").append(data.nickname);
            $("#postTime").append(data.postTime);
            $("#content").append(data.content);
        })

        $("#btnToSolved").click(function(event){
            swal({
                text: "처리하시겠습니까?",
                buttons: {
                    cancel : "취소",
                    confirm : "확인"
                }
            }).then(function(result){
                if(result) {
                    callPostService("/updateAsk", parseInt(param.num),null);
                    location.reload();
                }
            })
        })
    }

    $("#btnGoToList").click(function(event){
        var referrer = document.referrer;
        if(referrer.indexOf("adminList") < 0)
            history.back();
        else location.href = "/admin?state=1&page=1&checked=0";
    })
})