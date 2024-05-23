import { Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import Alert from "./Alert";
import axios from "axios"


function Register({alert,showAlert}) {
  let navigate=useNavigate();
  
    const [registerData, setRegisterData] = useState({
      email: "",
      fullname: "",
      phonenumber: "",
      password: "",
      cpass: "",
    });
    
    const Onchnagehandler = (e) => {
      setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
      });
    };
    const onSubmitHandler=async (e) =>{
      e.preventDefault()
      try {
        if(registerData.password!==registerData.cpass){
          showAlert({
           type:"danger",
           msg:"Passwords do not match"
          })
         }else{
          const { data } = await axios.post("/api/user/register", registerData);
          showAlert({
            type:"success",
            msg:data.success
          })
          setTimeout(() => {
            navigate("/login",{replace:true});
          }, 3000);
   
         }
      } catch (error) {
        showAlert({
          type:"danger",
          msg:error.response.data.error
        })
        
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
            <h1>Tasky Register</h1>
          </Link>
          </center>
        </div>
        <div>
          <Alert alert={alert}/>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="fullname"><b>Full Name :</b></label>
                <input type="text" name="fullname" onChange={Onchnagehandler}/>
                <label htmlFor="email"><b>Email:</b></label>
                <input type="email" name="email" onChange={Onchnagehandler}/>
                <label htmlFor="number"><b>Phone Number:</b></label>
                <input type="text" name="phonenumber" onChange={Onchnagehandler}/>
                <label htmlFor="password"><b>Password:</b></label>
                <input type="password" name="password" onChange={Onchnagehandler}/>
                <label htmlFor="cpass"><b>Confirm Password :</b></label>
                <input type="password" name="cpass" onChange={Onchnagehandler}/>
                <input type="submit" value="Register"></input>

            </form>
        </div>
        <p>Already have an account? <Link to="/Login"><b>Login</b></Link></p>
      </div>
    </>
  );
}

export default Register;
