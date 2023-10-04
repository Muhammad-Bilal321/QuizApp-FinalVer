import React, { useEffect, useState } from "react";
import { fbGet } from "../Config/firebaseMethod";
// import TestScreen from "./TestScreen";
import { Button } from "@mui/material";
import "./quizScreen.css";

export default function QuizScreen() {
  const [quizDetails, setQuizDetails] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [currentRenderQuestion, setCurrentRenderQuestion] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(true);

  // Fetch Question & Options from Database
  useEffect(() => {
    fbGet("QuizQuestion&Option")
      .then((data) => {
        console.log(data);
        setQuizData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCorrectAnswer = (correctAnswer, selectedAnswer) => {
    if (correctAnswer === selectedAnswer) {
      setScore(score + 1);
      console.log(score + 1);
    }
    setCurrentRenderQuestion(currentRenderQuestion + 1);
  };

  // Set Time Function
  useEffect(() => {
    // Fetch quiz data from Firebase
    fbGet("QuizDetails")
      .then((data) => {
        // Update the state with the retrieved data
        setQuizDetails(data);
        console.log(data);
        // Start the timer when data is fetched
        if (data.length > 0) {
          const quiz = data[0]; // Assuming you want to display the first quiz
          const quizEndTime = quiz.TimeDuration * 1000 + Date.now(); // Calculate end time in milliseconds
          startCountdownTimer(quizEndTime);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const startCountdownTimer = (endTime) => {
    // Calculate initial remaining time
    const initialRemainingTime = Math.max(0, endTime - Date.now());

    // Update the remaining time in state
    setRemainingTime(initialRemainingTime);

    // Start the timer
    const timerInterval = setInterval(() => {
      const updatedRemainingTime = Math.max(0, endTime - Date.now());

      if (
        updatedRemainingTime === 0 ||
        currentRenderQuestion === quizData.length - 1
      ) {
        clearInterval(timerInterval);
        setShowQuiz(false);
      }

      setRemainingTime(updatedRemainingTime);
    }, 1000);
  };

  return (
    // Time Render
    <div className="container mt-5">
      {quizDetails.map((quiz, index) => (
        <div key={index} className="quiz-question bg-light p-4 rounded shadow">
          <h2>{quiz.QuizName}</h2>
          <p>Time Duration: {quiz.TimeDuration} seconds</p>
          <p>Remaining Time: {Math.floor(remainingTime / 1000)} seconds</p>
        </div>
      ))}
      {/* Quiz Questions & Options */}
      {showQuiz && currentRenderQuestion < quizData.length && (
        <div className="container mt-5">
          <h3 className="quiz-question bg-light p-4 rounded shadow mb-5">
            {quizData[currentRenderQuestion].Question}
          </h3>
          <div className="quiz-question bg-light p-4 rounded shadow ">
            {quizData[currentRenderQuestion].Options.map(
              (btnRender, btnIndex) => (
                <Button
                  variant="contained"
                  color="success"
                  key={btnIndex}
                  onClick={() =>
                    handleCorrectAnswer(
                      quizData[currentRenderQuestion].CorrectOption,
                      btnRender
                    )
                  }
                  className="btn btn-primary btn-shadow btn-rounded btn-block my-3 mx-2 w-50"
                >
                  {btnRender}
                </Button>
              )
            )}
          </div>
        </div>
      )}

      {!showQuiz && (
        <div className="container mt-5">
          <p className="quiz-question bg-light p-4 rounded shadow">
            Your Total Score: {score}
          </p>
          <br />
          <p className="quiz-question bg-light p-4 rounded shadow">
            Passing Marks is 10
          </p>
        </div>
      )}
    </div>
  );
}
