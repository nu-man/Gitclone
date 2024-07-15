import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Register from "./components/Register.js";
import { useState, useEffect } from "react";
import PrivateRoutes from "./utils/PrivateRoutes.js";
import axios from "axios";

function App() {
  const [alert, setAlert] = useState(null);
  const [auth, setAuth] = useState(false);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  useEffect(() => {
    async function verifytoken() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await axios.get("/api/user/auth", {
            headers: { "auth-token": token },
          });
          console.log(data);
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    verifytoken();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login alert={alert} showAlert={showAlert} />}
          />
          <Route
            path="/register"
            element={<Register alert={alert} showAlert={showAlert} />}
          />
          <Route element={<PrivateRoutes auth={auth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
//console.log("all ok")
export default App;
