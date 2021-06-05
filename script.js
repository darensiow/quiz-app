function setActiveNext() {
  let i;
  let selectedValue;

  // Hide the notification (if it appeared previously)
  document.getElementById("notification").classList.remove("visible");

  // Find out the id of the quiz that is currently displayed
  for (i = 1; i <= noOfQuizzes; i++) {
    let qnId = document.getElementById(String(i));
    if (window.getComputedStyle(qnId).display === "block") {
      break;
    }
  }

  // Gather all the options for the question and put them in an array
  const options = document.querySelectorAll(
    'input[name="option' + String(i) + '"]'
  );

  // Use a for loop to find out which option was selected, and save the value as selectedValue
  for (const option of options) {
    if (option.checked) {
      selectedValue = option.value;
      break;
    }
  }

  if (typeof selectedValue === "undefined") {
    document.getElementById("notification").classList.add("visible");
    return;
  }
  //console.log(selectedValue);

  userAnswers[i - 1] = selectedValue;

  //console.log(userAnswers);

  // Update the question number in h3 element
  document.getElementById("qn-count").innerText =
    "Question " + String(i + 1) + " of " + String(noOfQuizzes) + ":";

  // Remove .active from each quiz in array
  for (let quiz of quizzes) {
    quiz.classList.remove("active");
  }

  // Add .active to the next quiz to make it visible
  if (i + 1 <= noOfQuizzes) {
    document.getElementById(String(i + 1)).classList.add("active");
  }

  // Remove Next button and add Finish button when we reach the last question
  if (i + 1 === noOfQuizzes) {
    nextButton.classList.remove("visible");
    finishButton.classList.add("visible");
  }

  // Add Previous button when we are not at the first question
  if (i + 1 !== 1) {
    previousButton.classList.add("visible");
  }
}

function setActivePrevious() {
  // Hide the notification (if it appeared previously)
  document.getElementById("notification").classList.remove("visible");

  // Find out the id of the quiz that is currently displayed
  for (i = 1; i <= noOfQuizzes; i++) {
    let qnId = document.getElementById(String(i));
    if (window.getComputedStyle(qnId).display === "block") {
      break;
    }
  }

  // Update the question number in h3 element
  document.getElementById("qn-count").innerText =
    "Question " + String(i - 1) + " of " + String(noOfQuizzes) + ":";

  // Remove .active from each quiz in array
  for (let quiz of quizzes) {
    quiz.classList.remove("active");
  }

  console.log(i);

  // Make previous quiz and the next button visible, and hide the finish button
  if (i - 1 >= 1) {
    document.getElementById(String(i - 1)).classList.add("active");
    nextButton.classList.add("visible");
    finishButton.classList.remove("visible");
  }

  // Remove Previous button when we reach the first question
  if (i - 1 === 1) {
    previousButton.classList.remove("visible");
  }
}

function finish(userAnswers, correctAnswers) {
  // Gather all the options for the last question and put them in an array
  const options = document.querySelectorAll(
    'input[name="option' + String(noOfQuizzes) + '"]'
  );

  // Check which option was selected and save its value
  for (const option of options) {
    if (option.checked) {
      selectedValue = option.value;
      break;
    }
  }

  // If user did not select an option, print warning message and halt callback function
  if (typeof selectedValue === "undefined") {
    document.getElementById("notification").classList.add("visible");
    return;
  }

  // Save user's answer inside userAnswers array
  userAnswers[noOfQuizzes - 1] = selectedValue;

  // numCorrect is the number of questions the user answered correctly
  let numCorrect = 0;

  for (let i = 0; i < correctAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      numCorrect++;
    }
  }

  // Hide all the quiz questions
  document.getElementsByClassName("container")[0].classList.remove("active");

  // Print out the user's score
  document.getElementById("result").innerText =
    "You got " +
    String(numCorrect) +
    " out of " +
    String(noOfQuizzes) +
    " questions correct.";

  document
    .getElementsByClassName("result-container")[0]
    .classList.add("active");
}

function reset() {
  let selectedValue;
  const userAnswers = [];

  document.getElementsByClassName("container")[0].classList.add("active");

  // Update the question number in h3 element
  document.getElementById("qn-count").innerText =
    "Question 1 of " + String(noOfQuizzes) + ":";

  // Remove .active from each quiz in array
  for (let quiz of quizzes) {
    quiz.classList.remove("active");
  }

  // Make the following visible: first question, Next button
  document.getElementById(String(1)).classList.add("active");
  nextButton.classList.add("visible");

  // Hide the following: Previous button, Finish button, score result
  previousButton.classList.remove("visible");
  finishButton.classList.remove("visible");
  document
    .getElementsByClassName("result-container")[0]
    .classList.remove("active");

  // Unselect all the radio options
  for (let i = 1; i <= noOfQuizzes; i++) {
    // Gather all the options for the question and put them in an array
    const options = document.querySelectorAll(
      'input[name="option' + String(i) + '"]'
    );

    // Use a for loop to find out which option was selected, and then uncheck the selection
    for (const option of options) {
      if (option.checked) {
        option.checked = false;
        break;
      }
    }
  }
}

// Use jQuery to find out the number of quiz questions
const quizIds = [];
$(".container > div").each((index, elem) => {
  quizIds.push(elem.id);
});

const noOfQuizzes = quizIds.length;
const userAnswers = [];
const correctAnswers = ["ShopCommerce", "all", "all"];

// Select all the quizzes and store them in array
const quizzes = document.getElementsByClassName("quiz");

const previousButton = document.getElementById("previous");
const finishButton = document.getElementById("finish");
const nextButton = document.getElementById("next");
const startOverButton = document.getElementById("reset");

nextButton.addEventListener("click", function () {
  setActiveNext();
});

previousButton.addEventListener("click", function () {
  setActivePrevious();
});

// Clicking the finish button
finishButton.addEventListener("click", function () {
  finish(userAnswers, correctAnswers);
});

// Clicking the start over button
startOverButton.addEventListener("click", function () {
  reset();
});
