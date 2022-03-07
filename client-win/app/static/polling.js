
var textbox;
var httpRequest = new XMLHttpRequest();


function update() {
    httpRequest.open('GET', "http://" + ipAddr + "/get", true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            var obj = JSON.parse(json);
            textbox.innerHTML = obj.messages;

        }
    };

}

window.onload = function () {
    textbox = document.getElementById("textbox");
    setInterval(() => {
        console.log("update");
        update();
    }, 1000);

}