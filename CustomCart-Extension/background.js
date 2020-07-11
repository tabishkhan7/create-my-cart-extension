
var data="";
chrome.runtime.onMessage.addListener(function (request,selection){
     
    if(request.task){
        if(request.task=="AddToCart"){
            data=data +" "+request.selected+"\n";
        }
        else if(request.task="SaveMyCart"){
            
            data=data +" "+request.selected+"\n";
            var blob = new Blob([data], {
                type: '"text/plain;charset=UTF-8"'
            });

            myurl = window.URL.createObjectURL(blob);

            chrome.downloads.download({
                url: myurl,
                filename: "MyCart.txt"
            }, function(downloadId) {

            });
            data="";
        }
    }
    
});