import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../services/auth";
import { useAuth } from "../../context/authContext/index";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/dashboard"); // Navigate to dashboard on successful login
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        navigate("/dashboard"); // Navigate to dashboard on successful Google sign-in
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to the register page
  };

  return (
    <>
      {userLoggedIn && <Navigate to="/dashboard" replace={true} />}
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 py-6 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isSigningIn ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="my-4 text-center">OR</div>

          <button
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isSigningIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing in with Google..." : "Sign in with Google"}
          </button>

          {/* Register Button */}
          <button
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleRegister} // Navigate to the register page
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
