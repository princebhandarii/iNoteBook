import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const response = await fetch(`https://inotebook-6pk4.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirct
      localStorage.setItem("token", json.authtoken);

      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        <div className="login_box">
          <div className="login-header">
            <span>Login</span>
          </div>

          <div className="input_box">
            <input
              type="email"
              id="email"
              className="input-field"
              name="email"
              value={credentials.email}
              onChange={onchange}
              required
            />
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <i className="bx bx-user icon"></i>
          </div>

          <div className="input_box">
            <input
              type="password"
              id="password"
              className="input-field"
              value={credentials.password}
              onChange={onchange}
              name="password"
              required
            />
            <label htmlFor="pass" className="label">
              Password
            </label>
            <i className="bx bx-lock-alt icon"></i>
          </div>

          <div className="input_box">
            <input type="submit" className="input-submit" value="Login" />
          </div>
          <div className="input_box">
            <Link to="/SignUp">
            Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
