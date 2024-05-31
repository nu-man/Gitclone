import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

function Login({ alert, showAlert }) {
  let navigate = useNavigate();
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login", logindata);
      localStorage.setItem("token", data.token);
      showAlert({
        type: "success",
        msg: "Login successful",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      showAlert({
        type: "danger",
        msg: error.response.data.error,
      });
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div>
        <center>
          <Link to="/">
            <img
              src="https://www.transparentpng.com/thumb/clock/amoxZ0-clock-clipart-hd.png"
              alt="img"
              style={{ width: "15%" }}
            />
            <h1>Tasky Login</h1>
          </Link>
        </center>
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <Alert alert={alert} />
          <label htmlFor="email">
            <b>Email:</b>
          </label>
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            required
          />
          <label htmlFor="password">
            <b>Password:</b>
          </label>
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            required
          />
          <input type="submit" value="Login" />
        </form>
      </div>
      <p>
        Don't have an account?{" "}
        <Link to="/Register">
          <b>Register</b>
        </Link>
      </p>
    </div>
  );
}

export default Login;
