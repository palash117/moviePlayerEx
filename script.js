var video;
var playPauseButton;
var paused = true;
var event;
var scrubber;
var onScrubbed = ()=>{
    console.log("scrubbed")
    value = scrubber.value
    video.currentTime = (video.duration*(value/100));
}
var updateScrub = ()=>{
    console.log("scrubbing")
    value = Math.floor((video.currentTime*100)/video.duration);
    scrubber.value = value
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
var init = ()=>{
    video  = document.getElementById("video");
    playPauseButton = document.getElementById("play_pause");
    scrubber = document.getElementById("scrubber")
    playPauseButton.addEventListener("click", playPause);
    scrubber.addEventListener("click",onScrubbed)
    video.addEventListener("timeupdate",updateScrub);
    video.addEventListener("click", playPause)
}

window.onload=init;
