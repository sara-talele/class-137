Status = "";
objectName = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 320);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 320);
    if (Status != "") {
        ObjectDetector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            document.getElementById("status").innerHTML = "Object Detected";
            document.getElementById("no_of_object").innerHTML = "No. of Object : " + objects.length;
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            objectName = document.getElementById('object_name').value;
    if (objects[i].label== objectName) {
        video.stop();
        ObjectDetector.detect(gotresults);
        document.getElementById("no_of_object").innerHTML=objectName+" found";
        synth=window.speechSynthesis;
        utterThis=new SpeechSynthesisUtterance(objectName+" found");
        synth.speak(utterThis);
    } else {

        document.getElementById("no_of_object").innerHTML=objectName+" not found";
    }
        }
    }
}

function start() {
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Object";
    objectName = document.getElementById('object_name').value;
}

function modelLoaded() {
    console.log("model loaded!");
    Status = true;
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}