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
  const [loading, setLoading] = useState(false);

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
          await axios.get("/api/user/auth", {
            headers: { "auth-token": token },
          });
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

  const showloading = (status) => {
    setLoading(status);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                alert={alert}
                showAlert={showAlert}
                loading={loading}
                showloading={showloading}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                alert={alert}
                showAlert={showAlert}
                loading={loading}
                showloading={showloading}
              />
            }
          />
          <Route element={<PrivateRoutes auth={auth} />}>
            <Route
              path="/dashboard"
              element={
                <Dashboard loading={loading} showloading={showloading} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
