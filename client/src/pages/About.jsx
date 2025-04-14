import { useState } from "react";
import { useAuth } from "../store/auth";

export const About = () => 
    {

        const [userName, setUserName] = useState("username")
        const [userExists, setUserExists] = useState(true);
        const { userData } = useAuth();
        if(userData && userExists){
            console.log("this is username : "+ userData)
            setUserName(userData.username);
            setUserExists(false);
        }
        return (
    <>
    <div className="content-wrapper">
  <div className="main-content">
   
    <h1>About</h1>
    <p>hi {userName}</p>
  </div>

</div>

    </>    
       
    
    );
    }