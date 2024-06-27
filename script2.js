let points = 0;
let currentIndex = 0;
let attempts = 0;

const answers = ["7", "6", "26", "15", "6", "73", "5", "16", "45", "12", "29", "8"];
const images = [
    "images/1.png", "images/2.png", "images/3.png", "images/4.png", 
    "images/5.png", "images/6.png", "images/7.png", "images/8.png", 
    "images/9.png", "images/10.png", "images/11.png", "images/12.png"
];

document.getElementById('nextButton').addEventListener('click', checkAnswer);

function checkAnswer() {
    const userInput = document.getElementById('colorInput').value.trim();
    
    if (userInput === answers[currentIndex]) {
        points++;
        attempts = 0; 
    } else {
        attempts++;
        if (attempts < 2) {
            alert('Try Again');
            return; 
        } else {
            attempts = 0; 
        }
    }

    currentIndex++;
    if (currentIndex >= images.length) {
        if (points >= 3) {
            alert('Challenge Completed! You are definitely not colorblind');
        } else {
            window.location.href = 'failure.html'; 
        }
        currentIndex = 0;
        points = 0;
        return;
    }

    updateTest();
}

function updateTest() {
    document.getElementById('testImage').src = images[currentIndex];
    document.getElementById('colorInput').value = '';
    document.getElementById('points').textContent = `Points: ${points}`;
}

updateTest();
