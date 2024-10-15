import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { TaskProvider } from "./context/TaskContext";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import Dashboard from "./pages/dashboard/index";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to="/" />;
};

export default App;
