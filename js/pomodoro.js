var clock = document.getElementById('timer');
var deadline, timeinterval, alarminterval,  status;
var audio = new Audio('assets/bell.mp3');
var defaultColor = '#a1a1a1'
var runningColor = '#000000'
status = 0;

function startTimer(type){
  console.log(status);
  if(status==1){
    //Timer already running. Confirm to change timer and then clear the current one
    ans = confirm("Are you sure you want to cancel the current Timer?");
    console.log(ans);
    if(ans==1){
        status = 0;
        clearInterval(timeinterval);
        clock.style.color = defaultColor;
    }
    else{
      return;
    }
  }

  status = 1
  clock.style.color = runningColor;
  mins = 0
  if(type == 'pomodoro')
    mins = 25
  else if(type == 'shortB')
    mins = 5
  else if (type == 'longB')
    mins = 10
  console.log(mins);
  deadline = new Date(Date.parse(new Date()) + mins * 60 * 1000);
  //deadline = new Date(Date.parse(new Date()) + 10 * 1000);
  updateClock();
  timeinterval = setInterval(updateClock, 1000);  
}

function stopTimer(){
  status = 0;

  audio.pause();
  clearInterval(timeinterval);
  clearInterval(alarminterval);
  clock.style.color = defaultColor;
  clock.innerHTML = "00:00"
  console.log("Timer stopped!");
}

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

function updateClock() {
  var t = getTimeRemaining();
  minsRemain = ('0' + t.minutes).slice(-2);
  secsRemain = ('0' + t.seconds).slice(-2);
  updateTime = minsRemain + ":" + secsRemain;
  clock.innerHTML = updateTime
  if(t.total == 0){
      status = false;
      clock.style.color = defaultColor;
      clearInterval(timeinterval);
      triggerAlarm();
  }
}

function triggerAlarm(){
  audio = new Audio('assets/bell.mp3');  
  count = 1
  alarminterval = setInterval(function(){
      audio = new Audio('assets/bell.mp3');
      audio.play();
      count++;
      if (count==5){
        clearInterval(alarminterval);
      }
  }, 3000);
  audio.play();
}