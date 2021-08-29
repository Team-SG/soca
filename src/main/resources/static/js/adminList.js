$(document).ready(function() {
    let param = getQuery();
    if(param.state === "1") {
        let accuseData;
        callPostService('getAccuseSelected', parseInt(param.num), function(data){
            if(data.types === 1) {
                callPostService('getPostByNum', parseInt(param.num), function(data2){accuseData = data2;})
            }
            else if(data.types === 2){
                callPostService('getReplies', parseInt(param.num), function(data2){accuseData = data2;})
            }
            else {
                callPostService('getRereplies', parseInt(param.num), function(data2){accuseData = data2;})
            }
            console.log(accuseData.content);
        });

    }
    else if(param.state === "2") {
        callPostService('getAskSelected', parseInt(param.num), function(data){

        })
    }
})