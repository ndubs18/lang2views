import { useState } from "react";
import "./login.css";
import Lang2ViewsLogo from "../Images/lang2views_logo.jpeg";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempted!");
  };

  const handleForgotPassword = () => {
    alert("Please retry your login.");
  };

  return (
    <div className="container">
      <div className="logo-and-title">
        <img className="lang2views-logo" src={Lang2ViewsLogo} alt="Logo" />
        <h1 className="login-title">Lang2views</h1>
      </div>
      <div className="card">
        <div className="header">
          <h3>Log In</h3>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                className="input"
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="buttons">
              <button className="login-button" type="submit">
                <p className="login-button-text">Log In ￫</p>
              </button>
              <button
                className="forgot-button"
                type="button"
                onClick={handleForgotPassword}
              >
                <p className="forgot-button-text">Forgot password?</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
