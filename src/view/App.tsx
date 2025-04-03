import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import CreateBotPage from "../pages/CreateBot";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />{" "}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bots/new" element={<CreateBotPage />} />
      </Routes>
    </Router>
  );
};

export default App;
