
function breakTime() {
    stopSession();
    onBreak = true;
    document.getElementById("earn-points").innerHTML = "";
    document.querySelector(".status-line").innerHTML = "On break";  
    showTimer();
}

function startTimer() {
    start = true;
    if(start) {
      if(onBreak) {
        document.querySelector(".status-line").innerHTML = "On break";
        buttonToggle();
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
            notifyMe();
            afterSession();
            if(start) onTimesUp();
          }
        }, 1000);
      } else {
        document.querySelector(".status-line").innerHTML = "Stay focused";
        buttonToggle();
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
            start =false;
            notifyMe();
            onTimesUp();
            showModal();
          }
        }, 1000);
      }
    }
  }

function notifyRequest() {
    Notification.requestPermission()
}

function loosePointsNotify() {
   var notify = new  Notification('1-Ring', {
        body: 'You have lost your points',
        icon: '',
    });
}

function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('1-Ring', {
                body: 'Timer finished',
                icon: '',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('1-Ring', {
                        body: 'Finished timer',
                        icon: '',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}