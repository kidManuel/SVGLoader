import Loader from '../loader'

function setMessage(message) {
    var newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.append(message);
    document.getElementById("content").appendChild(newMessage);
}

document.getElementById('loadMonkey').addEventListener('click', function () {

    // Place and register your SVG file
    var svgEl = Loader.place(document.getElementById('stage'),
        '../assets/monkey.svg'
    );
    setMessage("Monkey Loaded!")
})
