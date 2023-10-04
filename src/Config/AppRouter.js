import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "../Screen/SignupPage";

import LoginPage from "../Screen/LoginPage";
import AdminPanel from "../Screen/AdminPanel";
import Protected from "../Screen/Protected";
import QuizScreen from "../Screen/QuizScreen";
// import QuizScreen from '../Screen/QuizScreen'

export default function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Protected Screen={AdminPanel} />} />
          <Route
            path="/quizscreen"
            element={<Protected Screen={QuizScreen} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}
