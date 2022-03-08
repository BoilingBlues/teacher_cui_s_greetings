var r = /^\+?[1-9][0-9]*$/;

function getLocationLevel() {
    var item = null;
    var obj = document.getElementsByName("location-level");
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            item = obj[i].value;
        }
    }
    return item;
}
function getLocationVertical() {
    var item = null;
    var obj = document.getElementsByName("location-vertical");
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            item = obj[i].value;
        }
    }
    return item;
}
function putText() {
    var location_level = getLocationLevel();
    var location_vertical = getLocationVertical();

    var text = document.getElementById("textbox").value;
    if (text == "") {
        alert("请输入内容");
        return;
    }
    var fontsize = document.getElementById("fontbox").value;
    if (!r.test(fontsize)) {
        alert("请输入正确的字体大小");
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://" + ipAddr + "/", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("ok");
            }
        }
    };

    xhr.send(JSON.stringify({
        "messages": text,
        "location_level": location_level,
        "location_vertical": location_vertical,
        "fontsize": fontsize
    }));
}

window.onload = function () {
    textbox = document.getElementById("textbox");
    level = document.getElementsByName("location-level")
    vertical = document.getElementsByName("location-vertical")
    fontBox = document.getElementById("fontbox")
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "http://" + ipAddr + "/get", true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            var obj = JSON.parse(json);
            textbox.value = obj.messages;
            if (obj.location_level == "0") {
                level[0].checked = true;
            } else {
                level[1].checked = true;
            }
            if (obj.location_vertical == "0") {
                vertical[0].checked = true;
            } else {
                vertical[1].checked = true;
            }
            fontBox.value = obj.fontsize;
        }
    }
}