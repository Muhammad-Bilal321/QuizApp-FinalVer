import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { fbAdd } from "../Config/firebaseMethod";

export default function AdminInpPanel() {
  const [inputVal, setInputVal] = useState({
    QuizName: "",
    TimeDuration: 0,
    SecretKey: "",
    QuizOpen: "",
    Desciption: "",
  });

  const [quizData, setQuizData] = useState({
    Question: "",
    Options: [],
    Option: "",
    CorrectOption: "",
  });

  const [lockQuiz, setLockQuiz] = useState(false);

  const handleInput = (e) => {
    if (!lockQuiz) {
      const name = e.target.name;
      const value = e.target.value;
      setInputVal({ ...inputVal, [name]: value });
      console.log(e.target.value);
    }
  };

  const handleLockQuiz = () => {
    setLockQuiz(true);
  };

  const formSubmit = (e) => {
    console.log(inputVal);
    e.preventDefault();
    fbAdd("QuizDetails", inputVal)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuiz = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuizData({ ...quizData, [name]: value });
    console.log(quizData);
  };

  const addOptions = () => {
    if (quizData.Option.trim() !== "") {
      setQuizData({
        ...quizData,
        Options: [...quizData.Options, quizData.Option],
        Option: "",
      });
    }
  };

  const setCorrectOption = (option) => {
    setQuizData({
      ...quizData,
      CorrectOption: option,
    });
  };

  const quizSubmit = (e) => {
    console.log(quizData);
    e.preventDefault();
    fbAdd("QuizQuestion&Option", quizData)
      .then((res) => {
        console.log(res);
        setQuizData({
          Question: "",
          Options: [],
          Option: "",
          CorrectOption: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="container text-start" onSubmit={formSubmit}>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1 className="mx-5 px-3">App Admin</h1>
          <Button
            variant="contained"
            color="success"
            className="me-3"
            type="submit"
          >
            Save
          </Button>
        </div>

        <div className="mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <TextField
                id="filled-basic"
                label="Quiz Name"
                variant="filled"
                fullWidth
                onChange={handleInput}
                name="QuizName"
                disabled={lockQuiz}
              />
            </div>
            <div className="col-md-4">
              <TextField
                id="filled-basic"
                label="Time Duration"
                variant="filled"
                fullWidth
                onChange={handleInput}
                name="TimeDuration"
                type="number"
                disabled={lockQuiz}
              />
            </div>
            <div className="col-md-4">
              <TextField
                id="filled-basic"
                label="Secret Key"
                variant="filled"
                fullWidth
                onChange={handleInput}
                name="SecretKey"
                disabled={lockQuiz}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3">
            <TextField
              id="filled-basic"
              label="Quiz Open"
              variant="filled"
              fullWidth
              onChange={handleInput}
              name="QuizOpen"
              disabled={lockQuiz}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="filled-basic"
              label="Description"
              variant="filled"
              fullWidth
              onChange={handleInput}
              name="Description"
              disabled={lockQuiz}
            />
          </div>
          <Button
            variant="contained"
            color="warning"
            className="my-3"
            onClick={handleLockQuiz}
            disabled={lockQuiz}
          >
            Lock Quiz
          </Button>
        </div>
      </form>

      <hr />
      <form className="container w-75 text-start" onSubmit={quizSubmit}>
        <TextField
          id="filled-basic"
          label="Question"
          variant="standard"
          className="my-4 w-100"
          onChange={handleQuiz}
          name="Question"
          fullWidth
          value={quizData.Question}
        />

        <div className="mb-4">
          <div className="d-flex align-items-center">
            <TextField
              id="outlined-basic"
              label="Options"
              variant="standard"
              className="w-50 mr-3"
              onChange={handleQuiz}
              name="Option"
              value={quizData.Option}
            />
            <Button variant="contained" color="success" onClick={addOptions}>
              Add Option
            </Button>
          </div>
          <div className="mt-2">
            {quizData.Options.map((opt, ind) => (
              <div
                key={ind}
                className="shadow p-3 mb-3 bg-white rounded"
                onClick={() => setCorrectOption(opt)}
              >
                <h6>{opt}</h6>
              </div>
            ))}
          </div>
        </div>

        <TextField
          id="outlined-basic"
          label="Correct Option"
          variant="standard"
          className="my-3 w-100"
          onChange={handleQuiz}
          name="CorrectOption"
          value={quizData.CorrectOption}
          disabled
        />

        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>
    </>
  );
}
