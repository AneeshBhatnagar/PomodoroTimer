function getTimeRemaining() {
  var t = Date.parse(deadline) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function startBreak(){
  //deadline = new Date(Date.parse(new Date()) + 5 * 60 * 1000);
  //audio.pause();
  clearInterval(timeinterval);
  deadline = new Date(Date.parse(new Date()) + 5 * 1000);
  type=1;
  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}

function updateClock() {
  var t = getTimeRemaining();
  console.log(type);
  minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
  secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

  console.log(t.total);

  if(t.total == 0){
      audio = new Audio('assets/bell.mp3');
  }

  if (t.total <= 0) {
    //clearInterval(timeinterval);
    minutesSpan.innerHTML = ('00');
    audio.play();
    if(type==0){
      //Enable the Start Break Button
    }else{
      //Disable the Start Break Button
    }
  }

  if(t.total <= -10000){
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-3);
  }
}

var clock = document.getElementById('clockdiv');
var deadline, timeinterval;
var minutesSpan = clock.querySelector('.minutes');
var secondsSpan = clock.querySelector('.seconds');
var breakLeft = false;
var type;
var audio = new Audio('assets/bell.mp3');
minutesSpan.innerHTML = ('00');
secondsSpan.innerHTML = ('00');

function startTimer(){
  //deadline = new Date(Date.parse(new Date()) + 25 * 60 * 1000);
  deadline = new Date(Date.parse(new Date()) + 10 * 1000);

  //Disable the Start Timer Button
  type=0;
  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}

function stopTimer(){

  //Enable the Start Timer Button
  audio.pause();
  clearInterval(timeinterval);
  minutesSpan.innerHTML = ('00');
  secondsSpan.innerHTML = ('00');
}