$(document).ready(function() {
    let href = window.location.href;
    if(href !== "http://localhost:8080/quickMenuList") {
        let text = '<button type="button" id="btnGoEdit" class="btn btn-outline-primary font-weight-normal mb-3 ml-4" style="text-align: center">수정하기</button>';
        $("#buttons").append(text);
    }
    getSubjectList();
    getLiked();

    $("#btnGoEdit").click(function(){
        location.href = "quickMenuList";
    })

    $("#btnGoBack").click(function(){
        history.back();
    })
})

function getSubjectList() {
    let param = {
        year: 2021,
        semester: 1
    }

    callPostService("getSubjectList", param, function(data) {
        let text = "";
        for(let dataN = 0; dataN < data.length; dataN++) {
            text += "<tr><td>" + data[dataN].subjectNO +"</td></tr>"
        }
        $("#thisSemesterTaken").append(text);
    })
}

function getLiked() {
    callPostService("findLiked", null, function(data) {
        let text = "";
        for(let dataN = 0; dataN < data.length; dataN++) {
            text += "<tr>"
            text += "<td>" + data[dataN].subjectNO +"</td>"
            text += "<td onclick='deleteLiked'>X</td>"
            text += "</tr>"
        }
        $("#liked").append(text);
    })
}

function deleteLiked() {

}