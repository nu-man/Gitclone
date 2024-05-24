import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Register from "./components/Register.js";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(alert)=>{
    setAlert(alert);
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login alert={alert} showAlert={showAlert}/>} />
          <Route path="/register" element={<Register alert={alert} showAlert={showAlert}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
