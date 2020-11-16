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
let onBreak = true;
let checkLosePoints = true;
let TIME_LIMIT = 5;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let points = 200;
let setPoints =200;


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
           Hooray! You have focused ${formatTime(TIME_LIMIT)} minutes today. Click to earn ${setPoints} points!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-dismiss="modal" onclick="doublePoints()">Double points</button>
          <button type="button" class="btn btn-success" data-dismiss="modal" onclick="earnPoints()">Earn points</button>
        </div>
      </div>
    </div>
  </div>`;
  $(document).ready(function(){
    // Show the Modal on load
    $("#exampleModalLong").modal("show");
  });
}

function showLosePointsModal() {
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


function loosePoints () {
    while(checkLosePoints & onBreak) {
        showLosePointsModal();
        if(start) reset();
        break
    }
}



function restart() {
    unlockForm();
    onTimesUp();
    TIME_LIMIT = 5;
    timePassed = 0;
    start = false;
    checkLosePoints = false;
    onBreak = true;
    timeLeft = TIME_LIMIT;
    timerInterval = null;
    remainingPathColor = COLOR_CODES.info.color;
    showTimer();
}

function reset() {
    unlockForm();
    onTimesUp();
    TIME_LIMIT = 5;
    timePassed = 0;
    start = false;
    onBreak = true;
    checkLosePoints =false;
    timeLeft = TIME_LIMIT;
    timerInterval = null;
    remainingPathColor = COLOR_CODES.info.color;
    showTimer();
}

function showEarnPoints(){
    var e =document.getElementById("select-timer");
    e.addEventListener('change',(event) =>{
        const result =document.getElementById("earn-points");
        result.textContent = `Earn ${event.target.value} points`;
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


function showWallet() {
  document.getElementById('wallet').innerHTML = `<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-wallet2" fill="orange" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
</svg> ${points}`;
}


showTimer();
showEarnPoints();
showWallet();

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
    onBreak = false ;
    hideButton();
}

function hideButton() {
    var x = document.querySelector(".start-btn");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } 

function lockForm() {
    document.getElementById("select-timer").disabled=true;
}

function unlockForm() {
    document.getElementById("select-timer").disabled=false;
}

function startTimer() {
    start = true;
    onBreak = true;
    if(start) {
      checkLosePoints = true;
      hideButton();
      window.addEventListener('visibilitychange', loosePoints);
      lockForm();
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
          timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
        if (timeLeft === 0) {
          onTimesUp();
          showModal();
          restart();
          hideButton();
          start = false;
        }
      }, 1000);
    }
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
