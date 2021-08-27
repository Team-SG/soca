$(document).ready(function() {
    let href = window.location.href;
    if(href !== "http://localhost:8080/quickMenuList") {
        let text = '<button type="button" id="btnGoEdit" class="btn btn-outline-primary font-weight-normal mb-3" style="text-align: center">수정하기</button>';
        $("#buttons").append(text);
    }
    else {
        let text = '<button type="button" id="btnGoBack" class="btn btn-outline-primary font-weight-normal mb-3" style="text-align: center">돌아가기</button>'
        $("#buttons").append(text);
    }
    getSubjectList();
    getLiked();

    $("#btnGoEdit").click(function(){
        location.href = "quickMenuList";
    })

    $("#btnGoBack").click(function(){
        history.back();
        location.href = document.referrer;
    })

    $(".findSelectedPost").click(function(){
        let td = $(this).parent()
        let data = td.children().eq(0).text();
        if(href.indexOf("postList") !== -1) {
            location.href = "postList?page=1&checked=0&type=subject&search=" + data;
        }
    })
})

function getSubjectList() {
    let param = {
        year: 2021,
        semester: 1
    }

    callPostService("getSubjectList", param, function(data) {
        let text = "";
        if(window.location.href === "http://localhost:8080/quickMenuList") {
            for (let dataN = 0; dataN < data.length; dataN++) {
                text += "<tr><td>" + data[dataN].subjectNO + "</td></tr>"
            }
        }
        else if(window.location.href.indexOf("postList") !== -1){
            for (let dataN = 0; dataN < data.length; dataN++) {
                text += "<tr><td class='findSelectedPost'>" + data[dataN].subjectNO + "</td></tr>"
            }
        }
        else {
            for (let dataN = 0; dataN < data.length; dataN++) {
                text += "<tr><td>" + data[dataN].subjectNO + "</td></tr>"
            }
        }
        $("#thisSemesterTaken").append(text);
    })
}

function getLiked() {
    callPostService("findLiked", null, function(data) {
        let text = "";
        if(window.location.href === "http://localhost:8080/quickMenuList") {
            for (let dataN = 0; dataN < data.length; dataN++) {
                text += "<tr>"
                text += "<td>" + data[dataN].subjectNO + "</td>"
                text += "<td><input type='button' class='btnDeleteLiked' value='X'></td>"
                text += "</tr>"
            }
        }
        else if(window.location.href.indexOf("postList") !== -1){
            for (let dataN = 0; dataN < data.length; dataN++) {
                text += "<tr>"
                text += "<td class='findSelectedPost'>" + data[dataN].subjectNO + "</td>"
                text += "</tr>"
            }
        }
        else {
            for (let dataN = 0; dataN < data.length; dataN++) {
                text += "<tr>"
                text += "<td>" + data[dataN].subjectNO + "</td>"
                text += "</tr>"
            }
        }
        $("#liked").append(text);
    })

    let btnDeleteLiked = $(".btnDeleteLiked");
    btnDeleteLiked.css({
        "background-color": "white",
        "border": "0px",
        "color": "#212529"
    })
    btnDeleteLiked.click(function(){
        if(confirm("삭제하시겠습니까?") === true) {
            let btnDelete = $(this);
            let tr = btnDelete.parent().parent();
            let data = tr.children().eq(0).text();
            callPostService("deleteLiked", data, null);
            tr.remove();
        }
    })
}