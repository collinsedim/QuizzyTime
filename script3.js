// Shuffle the questions array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  
  // Define your quiz questions here
  var questions = [
    {
      question: 'Question 1',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correctAnswer: 0
    },
    {
      question: 'Question 2',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correctAnswer: 1
    },
    {
      question: 'Question 3',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correctAnswer: 2
    },
    {
      question: 'Question 4',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correctAnswer: 3
    }
    // Add more questions here...
  ];
  
  var shuffledQuestions = shuffleArray(questions); // Shuffle the questions array
  
  var currentQuestion = 0;
  var score = 0;
  var timeLeft = 125; // Total time for the quiz in seconds
  
  var questionElement = document.getElementById('question');
  var choicesElement = document.getElementById('choices');
  var resultElement = document.getElementById('result');
  var restartButton = document.getElementById('restart-button');
  var timeLeftElement = document.getElementById('time-left');
  var scoreValueElement = document.getElementById('score-value');
  var nextButton = document.getElementById('next-button');
  var submitButton = document.getElementById('submit-button');
  
  var timerInterval;

  function startQuiz() {
    showQuestion();
    startTimer();
  
    restartButton.style.display = 'none';
    resultElement.innerHTML = '';
    scoreValueElement.textContent = '';
    updateButtonVisibility();
  }
  
  function showQuestion() {
    var question = shuffledQuestions[currentQuestion]; // Use shuffledQuestions instead of questions
  
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';
  
    for (var i = 0; i < question.choices.length; i++) {
      var choice = document.createElement('input');
      choice.setAttribute('type', 'radio');
      choice.setAttribute('name', 'answer');
      choice.setAttribute('value', i);
      choice.addEventListener('click', function(event) {
        var clickedChoice = parseInt(event.target.value);
        selectAnswer(clickedChoice);
      });
  
      var label = document.createElement('label');
      label.textContent = question.choices[i];
  
      var choiceContainer = document.createElement('div');
      choiceContainer.appendChild(choice);
      choiceContainer.appendChild(label);
  
      choicesElement.appendChild(choiceContainer);
    }
  }
  
  
  function selectAnswer(selectedChoice) {
    var question = questions[currentQuestion];
  
    var radioButtons = document.getElementsByName('answer');
    radioButtons[selectedChoice].checked = true;
  
    if (selectedChoice === question.correctAnswer) {
      score++;
    }
  
    if (currentQuestion === questions.length - 1) {
      submitButton.disabled = false;
    }
  }
  
  function showSubmitButton() {
    nextButton.style.display = 'none';
    submitButton.style.display = 'block';
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
  
    questionElement.textContent = '';
    choicesElement.innerHTML = '';
    resultElement.textContent = 'Quiz ended! Total Score: ' + score + '/' + questions.length;
    scoreValueElement.textContent = score; // Update the score value
    restartButton.style.display = 'block';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
  }
  
  function startTimer() {
    timerInterval = setInterval(function() {
      var minutes = Math.floor(timeLeft / 60);
      var seconds = timeLeft % 60;
  
      // Add leading zeros if necessary
      var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  
      timeLeftElement.textContent = formattedMinutes + ':' + formattedSeconds;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
  
      timeLeft--;
    }, 1000);
  }
  
  
  function updateButtonVisibility() {
    nextButton.style.display = currentQuestion === questions.length - 1 ? 'none' : 'block';
  }
  
  function goToNextQuestion() {
    var selectedChoice = document.querySelector('input[name="answer"]:checked');
    
    if (selectedChoice) {
      currentQuestion++;
      showQuestion();
      updateButtonVisibility();
      
      if (currentQuestion === questions.length - 1) {
        showSubmitButton();
      }
    }
  }
  
  nextButton.addEventListener('click', goToNextQuestion);
  
  restartButton.addEventListener('click', function() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
  
    startQuiz();
  });
  
  submitButton.addEventListener('click', function() {
    if (currentQuestion === questions.length - 1) {
      clearInterval(timerInterval);
      endQuiz();
    }
  });
  
  restartButton.addEventListener('click', function() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    
    shuffledQuestions = shuffleArray(questions); // Shuffle the questions array again
    
    startQuiz();
  });

  document.addEventListener('DOMContentLoaded', function() {
    startQuiz();
  });
  