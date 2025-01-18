const router = require('express').Router();
const fs = require('fs');
const path = require('path');



const questions = require("../questions.json");

const getRandomQuestions = (num) => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, num);

  const correctAnswers = selectedQuestions.map((q) => q.answer);
  return { selectedQuestions, correctAnswers };
};

// API endpoint to fetch random questions and correct answers
router.get("/random-questions", (req, res) => {
  const { selectedQuestions, correctAnswers } = getRandomQuestions(5); // Get 5 random questions
  res.json({ questions: selectedQuestions, correctAnswers }); // Send questions and correct answers
});

// API endpoint to receive and process submitted answers
router.post("/submit-answers", (req, res) => {
  const { answers, correctAnswers } = req.body; // Extract submitted answers and correct answers
  let correctCount = 0;

  // Compare each submitted answer with the correct answer
  answers.forEach((answer, index) => {
    if (answer.selectedOption === correctAnswers[index]) {
      correctCount++;
    }
  });

  // Calculate discount: 15% per correct answer
  const discount = correctCount * 15;

  console.log("Submitted Answers:", answers);
  console.log("Correct Answers:", correctAnswers);
  console.log("Correct Count:", correctCount);
  console.log("Discount:", discount);

  // Redirect to the registration page with discount as a query parameter
  res.json({ discount }); // Send discount as response
});


module.exports = router;