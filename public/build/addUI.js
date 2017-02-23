
function requestFullScreen(element) {
    // 判断各种浏览器，找到正确的方法
    var requestMethod = element.requestFullScreen || //W3C
    element.webkitRequestFullScreen ||    //Chrome等
    element.mozRequestFullScreen || //FireFox
    element.msRequestFullScreen; //IE11
    if (requestMethod) {
        requestMethod.call(element);
    }
    else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function exitFull() {
    // 判断各种浏览器，找到正确的方法
    console.log(111);
    var exitMethod = document.exitFullscreen || //W3C
    document.mozCancelFullScreen ||    //Chrome等
    document.webkitExitFullscreen || //FireFox
    document.webkitExitFullscreen; //IE11
    if (exitMethod) {
        exitMethod.call(document);
    }
    else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

$(function(){
  var i=0;
  $('.fullscreenbtn').click(function (){
    i++;
    if (i%2) {
      requestFullScreen(document.documentElement);
    } else {
      exitFull();
    }
  })

})
