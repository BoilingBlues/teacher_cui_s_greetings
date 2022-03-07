function getLocation() {
    var item = null;
    var obj = document.getElementsByName("location");
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            item = obj[i].value;
        }
    }
    return item;
}

function putText() {
    var location = getLocation();
    if (location == null) {
        alert("请选择位置");
        return;
    }
    var text = document.getElementById("textbox").value;
    if (text == "") {
        alert("请输入内容");
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAddr + "/?message=" + text + "&location=" + location, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("ok");
            }
        }
    };

    xhr.send();
    console.log(location);
    console.log(text);
}

