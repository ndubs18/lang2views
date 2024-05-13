import { useEffect, useState } from "react";
import "./login.css";
import Lang2ViewsLogo from "../Images/lang2views_logo.jpeg";
import axios from "axios";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: formData,
    }).then((response) => response.text().then((value) => setLoginResponse(value)));
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
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
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
              <p>{loginResponse}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
