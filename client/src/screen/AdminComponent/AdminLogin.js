import React from "react";
import  "../styled/CSS/Admin.css";
import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


function AdminLogin({ setOpenModal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    useEffect(() =>{
      const userInfo  = localStorage.getItem("userInfo");
    
      if(userInfo){
        navigate("/Admin");
      }
    },[navigate]);


    const submitHandler =  async(e) => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
              
             const {data} = await axios.post("/api/users/admin",
              {
                  email,
                  password
              },
              config
              
              );
                console.log(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
                 window.location.href = "/Admin"; 
        } catch(error){
            alert("Your are Not Admin");
           
        }
        
    }

  return (
    <div className="modalBackground ">
      <div className="modalContainer">
             <div className="col-md-12  col-lg-12 col-12 ">
                    
             <form onSubmit={submitHandler}>
                    <h3>Admin Here</h3>
            
                    <label for="username">Username</label>
                    <input  placeholder="Email or Phone" id="username"
                       type="email" 
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                    />
            
                    <label for="password">Password</label>
                    <input  placeholder="Password" id="password"
                       type="password" 
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                    />
            
                    <button type="submit" className="adminbutton">Log In</button>
             </form>
                </div>
             </div>
           
        
      </div>
  );
}

export default AdminLogin;