leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
lscore = 0;
lw = 0;
lw2 = 0;
rscore = 0;
rw = 0;
volume = 0;


function preload(){
    song = loadSound("music.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotResults)
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');
    if(lscore > 0.2){
        circle(leftWristX, leftWristY, 20);
        lw = Number(leftWristY);
        lw2 = floor(lw);
        volume = lw2 / 500;
        song.setVolume(volume);
    }
    if(rscore > 0.2){
        circle(rightWristX, rightWristY, 20);
        rw = Number(rightWristY);

        if(rw > 0 && rw <= 100){
            rate = 0.5;
        }


        if(rw > 100 && rw <= 200){
            rate = 1;
        }


        if(rw > 200 && rw <= 300){
            rate = 1.5;
        }


        if(rw > 300 && rw <= 400){
            rate = 2;
        }


        if(rw > 400 && rw <= 500){
            rate = 2.5;
        }


        song.rate(rate);
        document.getElementById("speed").innerHTML = "speed = " + rate;
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}

function modelLoaded() {
    console.log("Model is loaded");
}

function gotResults(s) {
    if (s.length > 0) {
        console.log(s);
        leftWristX = s[0].pose.leftWrist.x;
        leftWristY = s[0].pose.leftWrist.y;
        rightWristX = s[0].pose.rightWrist.x;
        rightWristY = s[0].pose.rightWrist.y;
        console.log(leftWristX, leftWristY, rightWristX, rightWristY);
        lscore = s[0].pose.keypoints[9].score;
        rscore = s[0].pose.keypoints[10].score;
        document.getElementById("volume").innerHTML = "volume = " + volume
    }
}