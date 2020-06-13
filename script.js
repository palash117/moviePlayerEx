var video;
var playPauseButton;
var forwardButton;
var backwardButton;
var paused = true;
var event;
var scrubber;
var timerToggle = function(){
    var t = 0;
    return function toggle (){
        t = 1-t;
        switch(t){
            case 1:
                return function(a,b){
                    var aMin = Math.floor(a/60)==0?"0":Math.floor(a/60);
                    var aSec = Math.floor(a%60);
                    aSec = aSec<10?"0"+aSec:aSec;
                    var bMin = Math.floor(b/60)==0?"0":Math.floor(b/60);
                    var bSec = Math.floor(b%60)
                    bSec = bSec<10?"0"+bSec:bSec;
                    return `${aMin}:${aSec}/${bMin}:${bSec}`;
                };
                break;
            case 2:
            default:
                
                return function(a,b){
                    a = b-a;
                    var aMin = Math.floor(a/60)==0?"0":Math.floor(a/60);
                    var aSec = Math.floor(a%60);
                    aSec = aSec<10?"0"+aSec:aSec;
                    var bMin = Math.floor(b/60)==0?"0":Math.floor(b/60);
                    var bSec = Math.floor(b%60)
                    return `-${aMin}:${aSec}/${bMin}:${bSec}`;
                };
                return null;
        }
    }
}()
var timerFormatter;
var onScrubbed = ()=>{
    console.log("scrubbed")
    value = scrubber.value
    video.currentTime = (video.duration*(value/100));
}
var scrubVideo= function(time){
    video.currentTime = time;
}
var scrubForward = ()=>{
    var time = (video.duration-video.currentTime)>5?video.currentTime+5:video.duration;
    scrubVideo(time);
}
var scrubBackward = ()=>{
    var time = video.currentTime>5?video.currentTime-5:0;
    scrubVideo(time);
}
var updateControls = ()=>{
    console.log("scrubbing")
    value = Math.floor((video.currentTime*100)/video.duration);
    scrubber.value = value
    var timerData= timerFormatter(video.currentTime, video.duration);
    console.log(timerData)
    timer.innerHTML = timerData
}
var playPause = (_event)=>{
    event = _event;
    console.log("play/paused")
    switch(paused){
        case false:
            video.pause();
            paused = true;
            playPauseButton.innerHTML = ">";
            break;
        case true:
            video.play();
            paused = false;
            playPauseButton.innerHTML = "||";
            break;
            
    }
}
var changeTimerDisplay = function(){
    timerFormatter = timerToggle();
    // timer = timerFormatter(video.currentTime,video.duration);
}
var init = ()=>{
    timerFormatter = timerToggle();
    video  = document.getElementById("video");
    forwardButton = document.getElementById("forward");
    backwardButton= document.getElementById("backward");
    playPauseButton = document.getElementById("play_pause");
    scrubber = document.getElementById("scrubber")
    timer = document.getElementById("timer");
    playPauseButton.addEventListener("click", playPause);
    scrubber.addEventListener("click",onScrubbed)
    timer.addEventListener("click", changeTimerDisplay)
    video.addEventListener("timeupdate",updateControls);
    video.addEventListener("click", playPause)
    forwardButton.addEventListener("click",scrubForward);
    backwardButton.addEventListener("click",scrubBackward);

}

window.onload=init;
