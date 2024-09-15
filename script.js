let video = document.querySelector("video");
let recorderBtn = document.querySelector(".recorder-btn");
let timer = document.querySelector(".timer");
let recordFlag = false;
let chunks = [];
let recorder;
let constraints = {
  //   video: {
  //     facingMode: "user",
  //     width: { min: 1040, ideal: 1280, max: 1920 },
  //     height: { min: 480, ideal: 720, max: 1080 },
  //   },
  video: true,
  audio: true,
};
let timerId;
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;

  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start", (e) => {
    chunks = [];
  });
  recorder.addEventListener("dataavailable", (e) => {
    chunks.push(e.data);
  });

  recorder.addEventListener("stop", (e) => {
    console.log(chunks);
    let blob = new Blob(chunks, { type: "video/mp4" });
    let videoUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = videoUrl;
    a.download = "stream.mp4";
    a.click();
  });

  recorderBtn.addEventListener("click", (e) => {
    if (!recorder) true;

    recordFlag = !recordFlag;
    if (recordFlag) {
      recorder.start();
      startTimer();
      recorderBtn.classList.add("recording");
    } else {
      recorder.stop();
      stopTimer();
      recorderBtn.classList.remove("recording");
    }
  });
});

let counter = 0;
function startTimer(params) {
  timer.style.display = "block";
  function displayTimer() {
    counter++;
    let totalSeconds = counter;
    let hours = Number.parseInt(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;
    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    let seconds = totalSeconds;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.textContent = `${hours}:${minutes}:${seconds}`;
  }
  timerId = setInterval(displayTimer, 1000);
}
function stopTimer() {
  clearInterval(timerId);
  timer.style.display = "none";
}
