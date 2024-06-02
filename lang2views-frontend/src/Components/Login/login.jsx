import { useEffect, useState } from "react";
import "./login.css";
import Lang2ViewsLogo from "../../Images/lang2views_logo.jpeg";
import { useGlobalContext } from "../../Context/globalContext";
import axios from "axios";
import { createRoot } from "react-dom/client";
import ClientAndSampleCreationViews from "../../Pages/clientAndSampleCreationViews";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  //Works just like a useState variable:
  const { userInfo, setUserInfo } = useGlobalContext();
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);

  useEffect(() => {
    if (loginButtonClicked) {
      fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.text().then((value) => setLoginResponse(value))
    );
    }
  }, [loginButtonClicked]);

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

    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.text().then((value) => setLoginResponse(value))
    );

    if (value !== "Invalid request body: Please send email and password") {
      const root = document.querySelector("#root");

      const rootElement = createRoot(root);
      rootElement.render(<ClientAndSampleCreationViews />);
    }
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
                <p className="login-button-text">Log In</p>
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

export default Login;
