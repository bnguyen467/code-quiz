// Question library took from w3schools.com
const question = [
    {
        question: '1. What is HTML?',
        answers: [
            { quesContent: 'Hyper Text Markup Language', correct: true},
            { quesContent: 'Hyperlinks and Text Markup Language', correct: false},
            { quesContent: 'Home Tool Markup Language', correct: false},
            { quesContent: 'HighText Machine Langague', correct: false},
        ],
    },
    {
        question: '2. Choose the correct HTML element for the largest heading:',
        answers: [
            { quesContent: '<head>', correct: false},
            { quesContent: '<heading>', correct: false},
            { quesContent: '<h1>', correct: true},
            { quesContent: '<h6>', correct: false},
        ],
    },
    {
        question: '3. Which of the following characters indicate closing of a tag?',
        answers: [
            { quesContent: '.', correct: false},
            { quesContent: '/', correct: true},
            { quesContent: '\\', correct: false},
            { quesContent: '!', correct: false},
        ],
    },
    {
        question: '4. Which of the following attributes is used to add link to any element?',
        answers: [
            { quesContent: 'href', correct: true},
            { quesContent: 'ref', correct: false},
            { quesContent: 'link', correct: false},
            { quesContent: 'newref', correct: false},
        ],
    },
    {
        question: '5. What is CSS?',
        answers: [
            { quesContent: 'Computer Style Sheets', correct: false},
            { quesContent: 'Colorful Style Sheets', correct: false},
            { quesContent: 'Creative Style Sheets', correct: false},
            { quesContent: 'Cascading Style Sheets', correct: true},
        ],
    },
    {
        question: '6. The # symbol specifies that the selector is?',
        answers: [
            { quesContent: 'class', correct: false},
            { quesContent: 'tag', correct: false},
            { quesContent: 'id', correct: true},
            { quesContent: 'first', correct: false},
        ],
    },
    {
        question: '7. How do you change the text color of an element?',
        answers: [
            { quesContent: 'text-color=', correct: false},
            { quesContent: 'color: ', correct: true},
            { quesContent: 'background-color: ', correct: false},
            { quesContent: 'text-color: ', correct: false},
        ],
    },
    {
        question: '8. What is the correct JavaScript syntax to write "Hello World"?',
        answers: [
            { quesContent: 'system.out.println("Hello World)', correct: false},
            { quesContent: 'println("Hello World")', correct: false},
            { quesContent: 'document.write("Hello World)', correct: true},
            { quesContent: 'response.write("Hello World")', correct: false},
        ],
    },
    {
        question: '9. Using _______ statement is how you test for a specific condition.',
        answers: [
            { quesContent: 'select', correct: false},
            { quesContent: 'if', correct: true},
            { quesContent: 'switch', correct: false},
            { quesContent: 'for', correct: false},
        ],
    },
    {
        question: '10. Which of these is not a logical operator?',
        answers: [
            { quesContent: '!', correct: false},
            { quesContent: '&', correct: true},
            { quesContent: '&&', correct: false},
            { quesContent: '||', correct: false},
        ],
    },
]

// All buttons
const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("nextBtn");
const submitButton = document.getElementById("submitBtn");
const homeButton = document.getElementById("homeBtn");

// Instruction, questionDisplay, questions, showscore, score, answers, result, time, finish quiz, final score, remaining time, user name
const instruction = document.getElementById("instruction");
const questionDisplay = document.getElementById("questionDisplay");
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const showResult = document.getElementById('showResult');
const showScoreBar = document.getElementById('showScore');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('timeCount');
const finishQuiz = document.getElementById('finishQuiz');
const finalScore = document.getElementById('finalScore');
const remainTime = document.getElementById('remainTime');
const userName = document.getElementById('userName');

// Declare global variables current question, score, second, time
let currentIndex, score, second, time; 
let tableElem = document.createElement('table');


// When start button is clicked
startButton.addEventListener('click', startQuiz);

// When next button is clicked
nextButton.addEventListener('click', nextQuestion);

// When submit button is clicked
submitButton.addEventListener('click', function(){
    event.preventDefault();

    // Replace submit button by home button
    submitButton.classList.add('hide');
    homeButton.classList.remove('hide');
    // Passing an objective of score and time to submitScore function
    submitScore({
        Username: userName.value,
        Score: score,
        RemainingTime: second 
    })
});

// When home button is clicked
homeButton.addEventListener('click', function(){
    // Show start button and instruction again
    startButton.classList.remove('hide');
    instruction.classList.remove('hide');

    // Hide home button and score board
    homeButton.classList.add('hide');
    finishQuiz.classList.add('hide');

    // Remove the leader board
    tableElem.parentNode.removeChild(tableElem);
    
    resetQuestionBody();
})

function nextQuestion()
{
    if(currentIndex < question.length - 1)
    {
        currentIndex++;
        showResult.classList.add('hide');
        resetQuestionBody();
        showQuestion();
    }
    else
        endQuiz();
}

function startQuiz()
{
    // Hide instructions and start button
    instruction.classList.add('hide');
    startButton.classList.add('hide');

    // Show question, score, next button
    questionDisplay.classList.remove('hide');
    showScoreBar.classList.remove('hide');
    nextButton.classList.remove('hide');

    // set index to first question, score to 0
    currentIndex = 0;
    score = 0;
    second = 100;

    // Call next question function
    showQuestion();
    startTimer();
}

function showQuestion()
{
    // Get question at the current index
    questionElement.textContent = question[currentIndex].question;

    // Loop through question answers using forEach loop
    // Then create a button for each answer
    question[currentIndex].answers.forEach(x => {
        const button = document.createElement('button')
        button.innerText = x.quesContent;
        button.classList.add('answerButton');

        // Mark the true answer
        if (x.correct) {
          button.dataset.correct = x.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerElement.append(button);
      })
}

function selectAnswer(x)
{
    let selectedAnswer = x.target;
    let correctAnswer = selectedAnswer.dataset.correct;
    showResult.classList.remove('hide');
    if(correctAnswer)
    {
        score++;
        scoreElement.innerHTML = score; 
        showResult.innerHTML = "The answer is correct"
    }
    else
    {
        second -= 10;
        showResult.innerHTML = "The answer is not correct";
    }

    // automatically go to next question after 1 seconds and end quiz if passed question 10th
    setTimeout(() => {
        if(second <= 0)
            endQuiz();
        else if(currentIndex < question.length)
            nextQuestion();
        else 
            endQuiz();
    }, 1000);
    
}

// This function will remove the anwer buttons before go to next question
function resetQuestionBody() 
{
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild)
    }
}

// Set timer
function startTimer() 
{
    // Count down 1 second
    time = setInterval(() =>{
        second--;
        timeElement.textContent = second;
    }, 1000)
}

// end quiz
function endQuiz()
{
    // Stop timer
    clearInterval(time);

    // Hide questionDisplay and nextButton
    questionDisplay.classList.add('hide');
    showScoreBar.classList.add('hide');
    showResult.classList.add('hide');
    nextButton.classList.add('hide');

    // Show score board and submit button
    finishQuiz.classList.remove('hide');
    submitButton.classList.remove('hide');
    
    // Output final score and time
    finalScore.textContent = score;
    remainTime.textContent = second;
}

// When submit button is clicked, score is submited
function submitScore(submission)
{
    // Get the array from the storage, set to empty array if there is nothing
    let leaderBoard = JSON.parse(localStorage.getItem('leaderBoard')) || [];
    
    // Add new input user name and info. to array
    leaderBoard.push(submission);
    
    // Put into storage
    localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));

    // Sort the array by score
    leaderBoard.sort(function(a, b){
        return b.score - a.score;
    });

    // Create a table to display leader board


    // tableElem = document.createElement('table');
    tableElem.classList.add('customTable');
    tableElem.innerHTML = `
      <thead class="bodyText tableHead">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
          <th scope="col">Time Left</th>
        </tr>
      </thead>
    `;
  
    let bodyElem = document.createElement('tbody');
    bodyElem.classList.add('customTable');
    for (let i = 0; i < leaderBoard.length; i++) {
      let rowElem = document.createElement('tr')
      rowElem.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${leaderBoard[i].Username}</td>
        <td>${leaderBoard[i].Score}</td>
        <td>${leaderBoard[i].RemainingTime}s</td>
      `;
      bodyElem.append(rowElem);
    }

    tableElem.append(bodyElem);

    document.getElementById('container').append(tableElem);
}

