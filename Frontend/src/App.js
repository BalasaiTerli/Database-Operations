import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login";
import RegisterForm from "./components/Register";
import UserListPage from "./components/userListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<UserListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
