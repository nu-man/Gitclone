import axios from "axios";
import react, { useEffect} from "react"
import {useNavigate} from "react-router-dom"



function Dashboard(){
    let navigate=useNavigate
    useEffect(() => {
        async function fetchuser(){
            try {
                const {data}=await axios.get("./api/user/auth",{
                    headers:{
                        "auth-token" :localStorage.getItem("token")
                    }
                })
                console.log(data);
            } catch (error) {
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        }, []);
    return(
        <>
            <h1>Hello from dashboard</h1>
        </>
    )
}
export default Dashboard