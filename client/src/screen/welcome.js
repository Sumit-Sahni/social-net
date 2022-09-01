
import { NavLink} from "react-router-dom";
import {React, useState} from "react";

import HomeAndUsers from "./HomeAndUsers";
import styled from "styled-components";


const Home = styled.div`
  background-color: ;
`



const Welcome = () => {

  const [event, SetEvent] = useState(false); 
  const auth = localStorage.getItem("userInfo");
     return (
     <Home>
      <nav className="navbar navbar-expand-lg bg-dark p-4 ">
  <div className="container-fluid">
  <NavLink to={`myprofile/${JSON.parse(auth)._id}`} className="nav-link text-white">@{(JSON.parse(auth).name.charAt(0).toUpperCase()+JSON.parse(auth).name.slice(1))}</NavLink>
  <NavLink to="/Event" className="nav-link text-white mx-2">Events</NavLink>

    <button className="navbar-toggler border " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul  className="navbar-nav me-auto  mb-lg-0">
        <li className='nav-item'>
        <NavLink to="/Help" className="nav-link  text-white  flex-start">Query</NavLink>

        </li>
        <li>
        <button className="nav-link   bg-dark text-white " style={{border:"none"}} onClick={()=>{
           localStorage.removeItem("userInfo");
               window.location.href = "/";
           }}>Sign out</button> 
        </li>
      </ul>
    </div>
  </div>
      { JSON.parse(auth).isAdmin && <NavLink onClick={()=>{SetEvent(true)}} className="link-light mx-2 px-1" to="/Admin">Admin</NavLink>}
      </nav>  
       <HomeAndUsers/>
       
      </Home>
   
    )
}

export default Welcome;