$(document).ready(function() {
    let param = getQuery();
    let head = $("#favoriteHeader");
    if(param.state === "1") {
        head.append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">인기 강의 목록</strong>');
    }
    else {
        head.append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">인기 교수 목록</strong>')
    }
})