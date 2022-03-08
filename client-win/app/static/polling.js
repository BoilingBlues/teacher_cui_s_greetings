
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
            if (obj.location_level == "0") {
                textbox.classList.remove("right");
                textbox.classList.add("left")
            }
            if (obj.location_vertical == "1") {
                textbox.classList.remove("top");
                textbox.classList.add("button")
            }
            if (obj.location_level == "1") {
                textbox.classList.remove("left");
                textbox.classList.add("right")
            }
            if (obj.location_vertical == "0") {
                textbox.classList.remove("button");
                textbox.classList.add("top")
            }
            textbox.style.fontSize = obj.fontsize + "px"
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