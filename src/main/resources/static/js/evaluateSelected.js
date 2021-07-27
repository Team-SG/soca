$(document).ready(function() {
    //console.log(location.search)
    //console.log($("#code").val());
    var param = getQuery();
    callPostService("/findSelected", param, null);
})