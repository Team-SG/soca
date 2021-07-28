$(document).ready(function() {
    //console.log(location.search)
    //console.log($("#code").val());
    var param = getQuery();
    callPostService("findSelected", param, function(data){
        if(data.length == 0 ) {
            var text = "작성된 강의평가가 없습니다."
            $("#selectedEval").append(text);
        }


        for(var dataN = 0; dataN < data.length ; dataN++) {
            var param = {
                subjectID: data[dataN].subjectID
            }
            callPostService("getSubjectData", param, function (data2) {
                var text = '<li class="list-group-item justify-content-between align-items-left pt-2 pb-2 pl-3 pr-3">'
                    + '<span class="badge badge-primary">New</span>'
                    + '<a class="ml-2 mr-2" style="color:#000000"  href="\evaluateComplete?postNum='+data[dataN].postNum+'&subjectID='+data[dataN].subjectID+'">' + data2.subjectNO + ' - ' + data2.professor + '</a>';

                if(data[dataN].score1 != 0) {
                    text += '<ion-icon name="add-circle-outline"></ion-icon>';
                }

                // 좋아요 개수
                text += '<div class="float-right">'
                text += '<ion-icon name="heart-circle-outline"></ion-icon>'
                    + '<span class="pl-1 pr-3">' + data[dataN].recommendNum + '</span>'

                // 별점
                for (var i = 2; i <= data[dataN].quality; i = i + 2) {
                    text += '<ion-icon name="star"></ion-icon>';
                }
                if (data[dataN].quality % 2 == 1) {
                    text += '<ion-icon name="star-half"></ion-icon>'
                }
                for (var i = data[dataN].quality; i < 9; i = i + 2) {
                    text += '<ion-icon name="star-outline"></ion-icon>'
                }

                // comment
                text += '</div>' + '</br></br>'
                    + '<span class="ml-3" style="color:#000000">' + data[dataN].commentFinal + '</span>'
                    + '</li>'

                // 삽입
                $("#selectedEval").append(text);
            })
        }
    });
})