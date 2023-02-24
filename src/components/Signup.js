import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../states/operations";
import { register } from "../states/userSlice";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleRegister = async (event) => {
    event.preventDefault();
    const responseData = await registerUser({
      username: usernameRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });
    if (responseData) {
      dispatch(register(responseData));
      navigate("/home");
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleRegister}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              ref={firstNameRef}
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              ref={lastNameRef}
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              ref={emailRef}
            />
          </div>
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
              Sign Up
            </button>
          </div>
          <p className="sign-in-navigator">
            Already registered? <a href="/sign-in">sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
