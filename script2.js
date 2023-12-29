const quizData = [
    {
        question: "1.which of the following methods can be used to display data in some form using Javascript?",
        options: ["document.write()", "console.log()", "window.alert()", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "2.What keyword is used to check whether a given property is valid or not?",
        options: ["in", "is in", "exists", "lies"],
        correctAnswer: "in"
    },
    {
        question: "3.When an operator's value is NULL, the typeof returned by the unary operator is:",
        options: ["Boolean", "Undefined", "Object", "Integer"],
        correctAnswer: "Object"
    },
    {
        question: "4.Which function is used to serialize an object into a JSON string in Javascript?",
        options: ["stingify()", "parse()", "convert()", "None of the above"],
        correctAnswer: "stringify()"
    },
    {
        question: "5.Which are the following are closures in Javascript?",
        options: ["Variables", "Functions", "Objects", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "6.Which of the following is not a Javascript framework?",
        options: ["Node", "Vue", "React", "Cassandra"],
        correctAnswer:  "Cassandra"
    },
    {
        question: "7. what keyword is used to declare an asynchronous function in Javascript?",
        options: ["async", "await", "setTimeout", "None of the above"],
        correctAnswer: "async"
    },
    {
        question: "8.How to stop an interval timer in Javascript?",
        options: ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
        correctAnswer: "clearInterval"
    },
    {
        question: "9.Which object in Javascript doesn't have a prototype?",
        options: ["Basic Object", "All objects have a prototype", "None of the objects have a prototype", "None of the above"],
        correctAnswer: "Base Object"
    },
    {
        question: "10.Which of the following are not server-side Javascript?",
        options: ["Date", "FileUpload", "Function", "All of the above"],
        correctAnswer: "All of the above"
    },
    // Add more questions here...
];

const quizTimeLimit = 300; // Time limit in seconds (5 minutes)
let currentQuestion = 0;
let score = 0;
let username = "";
let timer;

function startQuiz() {
    username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Please enter your username.");
        return;
    }

    document.getElementById("registration-container").style.display = "none";
    document.getElementById("quiz-questions").style.display = "block";
    startTimer();
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById("quiz-questions");
    const currentQuizData = quizData[currentQuestion];

    questionContainer.innerHTML = `
        <h2>${currentQuizData.question}</h2>
        ${currentQuizData.options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${option}
            </label>
        `).join('')}</br>
        <button onclick="submitAnswer()">Submit</button>
    `;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert("Please select an option before submitting.");
        return;
    }

    const userAnswer = quizData[currentQuestion].options[selectedOption.value];

    if (userAnswer === quizData[currentQuestion].correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        stopTimer();
        verifyAnswers();
    }
}

function verifyAnswers() {
    document.getElementById("quiz-questions").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    const resultContainer = document.getElementById("result-container");
    const scorePercentage = (score / quizData.length) * 100;

    resultContainer.innerHTML = `
        <h1>Quiz Result</h1>
        <p id="score">${username}, your score: ${score} out of ${quizData.length}</p>
        <p id="feedback">${getFeedback(scorePercentage)}</p>
    `;
}

function getFeedback(scorePercentage) {
    if (scorePercentage >= 80) {
        return "Outstanding! Great job!";
    } else if (scorePercentage >= 60) {
        return "Good! You did well.";
    } else {
        return "Better luck next time. Keep practicing.";
    }
}

function startTimer() {
    let timeRemaining = quizTimeLimit;
    const timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    document.getElementById("quiz-container").appendChild(timerDisplay);

    timer = setInterval(function () {
        timeRemaining--;
        document.getElementById("timer").innerText = `Time Left: ${formatTime(timeRemaining)}`;

        if (timeRemaining <= 0) {
            stopTimer();
            verifyAnswers();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    document.getElementById("timer").remove();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
