import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../states/operations";
import { register } from "../states/userSlice";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    const responseData = await loginUser({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
    if (responseData) {
      dispatch(register(responseData));
      navigate("/home");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleLogin}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              ref={usernameRef}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="sign-up-navigator">
            Don't have an account? <a href="/sign-up">sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
