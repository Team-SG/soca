$(document).ready(function() {
    let param = getQuery();
    let header = $(".toast-header");
    if(param.state === 1) {
        header.append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">신고 목록</strong>');
    }
    else {
        header.append('<strong class="mr-auto mt-2 mb-2" style="color:#000000">기술 문의 목록</strong>');
    }
})