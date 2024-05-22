import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

function Login({alert,showAlert}){
  const [logindata,setLogindata]=useState({
    email:'',
    password: ""
  })
  const Onchnagehandler = (e) => {
    setLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler= async (e)=>{
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/user/login", logindata);
    } catch (error) {
      // showAlert({
      //   type:"danger",
      //   msg:error.response.data.error
      // })
      console.log(error);
    }
  }
    return (
        <>
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
                
                    <label htmlFor="email"><b>Email:</b></label>
                    <input type="email" name="email" onChange={Onchnagehandler}/>
                    <label htmlFor="password"><b>Password:</b></label>
                    <input type="password" name="password" onChange={Onchnagehandler}/>
                    <input type="submit" value="Login"></input>
    
                </form>
            </div>
            <p>Don't have an account? <Link to="/Register"><b>Register</b></Link></p>
          </div>
        </>
    )
}
export default Login