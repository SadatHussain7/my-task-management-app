import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./pages/TaskManager";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<TaskManager />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
