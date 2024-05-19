import { Link } from "react-router-dom";

function Register() {
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
                <label htmlFor="fname"><b>Full Name :</b></label>
                <input type="text" name="fname"/>
                <label htmlFor="email"><b>Email:</b></label>
                <input type="email" name="fname"/>
                <label htmlFor="number"><b>Phone Number:</b></label>
                <input type="text" name="fname"/>
                <label htmlFor="password"><b>Password:</b></label>
                <input type="text" name="fname"/>
                <label htmlFor="cpass"><b>Confirm Password :</b></label>
                <input type="text" name="fname"/>
                <input type="submit" value="Register"></input>

            </form>
        </div>
        <p>Already have an account? <Link to="/Login"><b>Login</b></Link></p>
      </div>
    </>
  );
}
export default Register;
