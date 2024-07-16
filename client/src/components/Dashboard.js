import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

function Dashboard({ loading, showloading }) {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    async function fetchuser() {
      try {
        showloading(true);
        const { data } = await axios.get("./api/user/auth", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        showloading(false);

        console.log(data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    fetchuser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#e5e5e5",
          padding: "15px",
          textAlign: "center",
        }}
      >
        {loading && <Loading />}
        <h1>Tasky App</h1>
      </div>
      <div style={{ overflow: "auto" }}>
        <div className="main">
          <h2>Schedule New Tasks</h2>
          <hr></hr>
          <form>
            <label htmlFor="taskname">
              <b>Task Name</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter task name"
              name="taskname"
            ></input>
            <label htmlFor="deadline">
              <b>Deadline</b>
            </label>
            <br />
            <br />
            <input
              type="datetime-local"
              placeholder="Enter task deadline"
              name="deadline"
            ></input>
            <br />
            <label htmlFor="notificatonType">
              <b>Notification Type</b>
            </label>
            <br />
            <select name="notificatonType">
              <option value="Choose your notification type"></option>
              <option value="SMS"></option>
              <option value="Email"></option>
              <option value="Both"></option>
            </select>
            <hr></hr>
            <input type="checkbox"
            name="agree"></input>
            <label htmlFor="agree">
                By clicking Schedule Job Button below, you agree to recieve emails and mesages as reminder notiications.

            </label><br/>
            <br/><br/>
            <input type="submit" value="Schedule Job"></input>
          </form>
        </div>
        <div className="menu">
          <Link to="/">Link 1</Link>
          <Link to="/">Link 2</Link>
          <Link to="/">Link 3</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
