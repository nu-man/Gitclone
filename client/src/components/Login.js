import { useState } from "react";
import { Link } from "react-router-dom";

function Login(){
  // const [logindata,setLogindata]=useState({
  //   email:''
  // })
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
                <h1>Tasky Register</h1>
              </Link>
              </center>
            </div>
            <div>
                <form>
                    
                    <label htmlFor="email"><b>Email:</b></label>
                    <input type="email" name="email"/>
                    <label htmlFor="password"><b>Password:</b></label>
                    <input type="password" name="password"/>
                    <input type="submit" value="Login"></input>
    
                </form>
            </div>
            <p>Don't have an account? <Link to="/Register"><b>Register</b></Link></p>
          </div>
        </>
    )
}
export default Login