let startTime;
let reactionTime;
let timeoutID;
let personalBestTime = localStorage.getItem('personalBestTime') || Infinity;
let canReact = false;
let isTestRunning = false;
let reactionDisplayed = false;

document.getElementById('startButton').addEventListener('click', startTest);
document.getElementById('tryAgainButton').addEventListener('click', tryAgain);
document.getElementById('reactionArea').addEventListener('click', recordReaction);

updatePersonalBestTime();

function startTest() {
    if (isTestRunning) return;
    clearTimeout(timeoutID);
    document.getElementById('reactionMessage').textContent = 'Wait for the color change...';
    document.getElementById('reactionArea').style.backgroundColor = '#222';
    document.getElementById('tryAgainButton').style.display = 'none';
    canReact = false;
    reactionDisplayed = false;

    let randomDelay = Math.floor(Math.random() * 5000) + 2000;
    timeoutID = setTimeout(() => {
        if (!canReact) {
            document.getElementById('reactionMessage').textContent = 'Click Now!';
            document.getElementById('reactionArea').style.backgroundColor = '#4CAF50';
            startTime = Date.now();
            canReact = true;
            isTestRunning = true;
        }
    }, randomDelay);

    document.getElementById('startButton').style.display = 'none';
}

function recordReaction() {
    if (!canReact || !isTestRunning || reactionDisplayed) {
        location.reload(); // Reload the page if conditions are not met
    }

    reactionTime = Date.now() - startTime;
    document.getElementById('reactionTime').textContent = reactionTime;
    document.getElementById('reactionMessage').textContent = 'Your Reaction Time: ' + reactionTime + ' ms';
    document.getElementById('reactionArea').style.backgroundColor = '#222';

    if (reactionTime < personalBestTime) {
        personalBestTime = reactionTime;
        localStorage.setItem('personalBestTime', personalBestTime);
        updatePersonalBestTime();
    }

    isTestRunning = false;
    reactionDisplayed = true;
    document.getElementById('tryAgainButton').style.display = 'block';
}

function updatePersonalBestTime() {
    let personalBestTimeElement = document.getElementById('personalBestTime');
    personalBestTimeElement.textContent = personalBestTime;
}

function tryAgain() {
    clearTimeout(timeoutID);
    document.getElementById('reactionMessage').textContent = 'Wait for the color change...';
    document.getElementById('reactionArea').style.backgroundColor = '#222';
    document.getElementById('reactionTime').textContent = '0';
    document.getElementById('tryAgainButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    canReact = false;
    isTestRunning = false;
    reactionDisplayed = false;

    let randomDelay = Math.floor(Math.random() * 5000) + 2000;
    timeoutID = setTimeout(() => {
        if (!canReact) {
            document.getElementById('reactionMessage').textContent = 'Click Now!';
            document.getElementById('reactionArea').style.backgroundColor = '#4CAF50';
            startTime = Date.now();
            canReact = true;
            isTestRunning = true;
        }
    }, randomDelay);

    document.getElementById('startButton').style.display = 'none';
}
