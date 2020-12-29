const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 20;
const ALERT_THRESHOLD = 10;


const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let start =false;
let onBreak = false;
let checkLosePoints = true;
let stoppedSession =false;
let TIME_LIMIT = 5;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let points = 200;
let setPoints =200;


showTimer();
showEarnPoints();
showWallet();


function showTimer () {
    document.getElementById('app').innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
        TIME_LIMIT
      )}</span>
    </div>
    `;
}

function showModal() {
    document.getElementById("notification").innerHTML = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Times up!</h5>
        </div>
        <div class="modal-body">
           Hooray! You have focused ${formatTime(TIME_LIMIT)} minutes. Click to earn ${setPoints} points!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-dismiss="modal" onclick="doublePoints()">Double points</button>
          <button type="button" class="btn btn-success" data-dismiss="modal" onclick="afterSession()">Earn points</button>
        </div>
      </div>
    </div>
  </div>`;
  $(document).ready(function(){
    // Show the Modal on load
    $("#exampleModalLong").modal("show");
  });
}

function resetConfirm() {
  document.getElementById("notification").innerHTML = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Hang on there!</h5>
        </div>
        <div class="modal-body">
           Stop this session?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="onTimesUp()">Cancel</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="stopSession()">Stop</button>
        </div>
      </div>
    </div>
  </div>`;
  $(document).ready(function(){
    // Show the Modal on load
    $("#exampleModalLong").modal("show");
  });
}

function loosePointsModal() {
  document.getElementById("notification").innerHTML = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Times up!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
         Oops! You can do better next time.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>`;
  $(document).ready(function(){
    // Show the Modal on load
    $("#exampleModalLong").modal("show");
  });
}
 
function afterSession() {
  if(onBreak ==false) earnPoints();
  document.getElementById("notification").innerHTML = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Well done! What's next?</h5>
      </div>
      <div class="modal-body" >
      <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="stopSession()">Skip break</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="breakTime()">Take a break</button>
      </div>
    </div>
  </div>
</div>`;
$(document).ready(function(){
  // Show the Modal on load
  $("#exampleModalLong").modal("show");
});
}

function earnPoints() {
  if (setPoints == 200 ) {
     points += 200;
} else if(setPoints == 500 ) {
     points +=500;
} else if (setPoints ==1000) {
     points += 1000;
} else if (setPoints ==2000) {
     points += 2000;
} else if(setPoints == 4000) {
     points += 4000;
} else if(setPoints == 7000) {
     points += 7000;
} else if(setPoints == 10000) {
     points +=10000;
}
  showWallet();
}


function doublePoints() {
  if(onBreak) {
    if (setPoints == 200 ) {
      points += 200*2;
  } else if(setPoints == 500 ) {
      points +=500*2;
  } else if (setPoints ==1000) {
      points += 1000*2;
  } else if (setPoints ==2000) {
      points += 2000*2;
  } else if(setPoints == 4000) {
      points += 4000*2;
  } else if(setPoints == 7000) {
      points += 7000*2;
  } else if(setPoints == 10000) {
      points +=10000*2;
  }
    showWallet();
  }
}


function loosePoints () {
  if(start ==true && onBreak == false) {
    loosePointsNotify();
    loosePointsModal();
    onTimesUp();
    stopSession();
 }
}

function stopSession() {
    document.querySelector(".status-line").innerHTML = "Start to focus";
    unlockForm();
    var x = document.querySelector(".reset-btn");
    var y = document.querySelector(".start-btn");
    var z = document.querySelector(".break-btn");
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";

  TIME_LIMIT = 5;
  timePassed = 0;
  start = false;
  onBreak =false;
  setPoints = 0;
  checkLosePoints =false;
  timeLeft = TIME_LIMIT;
  timerInterval = null;
  remainingPathColor = COLOR_CODES.info.color;
  
  showTimer();
}

function reset() {
  if(start){
    clearInterval(timerInterval);
    resetConfirm();
  } 
}

function pauseTimer(){
    clearInterval(timerInterval);
    var x = document.querySelector(".reset-btn");
    var y = document.querySelector(".start-btn");
    var z = document.querySelector(".break-btn");
    x.style.display = "block";
    y.style.display = "block";
    z.style.display = "none";
}

function showEarnPoints(){
      if(onBreak) {
        var e =document.getElementById("select-timer");
        e.addEventListener('change',(event) =>{
            setPoints = event.target.value;
            if (setPoints == 200 ) {
                TIME_LIMIT = 5;
            } else if(setPoints == 500 ) {
                TIME_LIMIT = 10*60;
            } else if (setPoints ==1000) {
                TIME_LIMIT = 15*60;
            } else if (setPoints ==2000) {
                TIME_LIMIT = 25*60;
            } else if(setPoints == 4000) {
                TIME_LIMIT = 30*60;
            } else if(setPoints == 7000) {
                TIME_LIMIT = 45*60;
            } else if(setPoints == 10000) {
                TIME_LIMIT = 60*60;
            }
            showTimer();
        } );
      } else {
        var e =document.getElementById("select-timer");
        e.addEventListener('change',(event) =>{
          const result =document.getElementById("earn-points");
            if(onBreak==false) {
              result.textContent = `Earn ${event.target.value} points`;
            }
            setPoints = event.target.value;
            if (setPoints == 200 ) {
                TIME_LIMIT = 5;
            } else if(setPoints == 500 ) {
                TIME_LIMIT = 10*60;
            } else if (setPoints ==1000) {
                TIME_LIMIT = 15*60;
            } else if (setPoints ==2000) {
                TIME_LIMIT = 25*60;
            } else if(setPoints == 4000) {
                TIME_LIMIT = 30*60;
            } else if(setPoints == 7000) {
                TIME_LIMIT = 45*60;
            } else if(setPoints == 10000) {
                TIME_LIMIT = 60*60;
            }
            showTimer();
        } );
        
      }
}


function showWallet() {
  document.getElementById('wallet').innerHTML = `<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-wallet2" fill="orange" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
</svg> ${points}`;
}


function stopTimer() {
    timerInterval = setInterval(() => {
        document.getElementById("base-timer-label").innerHTML = formatTime(
          timePassed
        );
        setCircleDasharray();
        setRemainingPathColor(timePassed);
      }, 1000);
}

function onTimesUp() {
    clearInterval(timerInterval);
}

function lockForm() {
    document.getElementById("select-timer").disabled=true;
}

function unlockForm() {
    document.getElementById("select-timer").disabled=false;
}

function buttonToggle() {
    var start_btn = document.querySelector(".start-btn");
    var break_btn = document.querySelector(".break-btn");
    var reset_btn = document.querySelector(".reset-btn");
    start_btn.style.display = "none";
    break_btn.style.display = "block";
    reset_btn.style.display = "none";
}


function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
