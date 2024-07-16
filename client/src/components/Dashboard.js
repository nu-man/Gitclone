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
          <h2>Lorem Ipsum</h2>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </p>
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
