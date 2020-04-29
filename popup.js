$(document).ready(function() {
    console.log("popup activate")
    let bgpage = chrome.extension.getBackgroundPage();
    let word = bgpage.word.toLowerCase();
    console.log(word);

    $("#userselected").html(word);
    if(word.length==0) {
        word = "#";
        $("#userselected").html("Word Search");
    }

    $(".dict").each(function() {
        var url = $(this).attr("href")+word;
        $(this).attr("href", url);
    });

    $(".search").each(function() {
        var url = $(this).attr("href") + word + " " + $(this).attr("lang");
        $(this).attr("href", url);
        $(this).html(word + " " + $(this).attr("lang"))
    });

    url = 'https://api.wordnik.com/v4/word.json/'+word+'/audio?useCanonical=true&limit=50&api_key=ilfs2qthq2kmkjab3fdi9znhgx607h2rkzgitha3t6cm04j5y'

    function gotData(data) {
        let audio = document.getElementById("pronunciation");
        var id;
        for(id = 0; id<data.length; ++id) {
          if(data[id].createdBy==="macmillan") {
            $("#pronunciation").attr("src", data[id].fileUrl);
            $("#pronunciation").attr("volume", 0.1);
            break;
          }
        }
    }

    request = new XMLHttpRequest;
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
          data = JSON.parse(request.responseText);
          gotData(data);
        } 
    };  
    request.send();
});