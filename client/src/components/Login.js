import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";
import Loading from "./Loading";

function Login({ alert, showAlert, loading, showloading}) {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line
  }, []);
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
      showloading(true)
      const { data } = await axios.post("/api/user/login", logindata);
      showloading(false)
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
      showloading(false)
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
            {loading && <Loading/>}
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
