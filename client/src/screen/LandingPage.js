import React from "react";
import  {useEffect, useState, Fragment} from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import LoginScreen from "./LoginScreen";
import Footer from "./footer";

const SinhgadFace = styled.div`
font-family: "Times New Roman", Times, serif;
   font-size: 2rem;
   color: 0000;
   font-family: 'Amatic SC', cursive;
    // font-weight:bold;
`

const TotalUser = styled.div`
  padding: 0.5rem;
h1{
  font-size: 12rem;
  font-weight: bold!important;
  color : #0d617f;
  font-family: 'Amatic SC', cursive;
}
 @media (max-width: 412px) {
  h1{
    font-size: 7rem;
  }
`
const TotalUserCount = styled.div`
 padding: 0.5rem;
h1{
  font-size: 8rem;
  font-weight: lighter;
  color : 0000;
  font-family: "Times New Roman", Times, serif;
}

`



const LandingPage = () => {

    const [count, setCount] = useState(0);


    useEffect(()=>{
      const getAllUsers = async () =>{
        const {data} = await axios.get("/allusers")
        setCount(data.data.length)
     }
      getAllUsers();
    },[])



    return (
         
        <>
                <Fragment>
            <nav className="navbar navbar-expand-lg bg-body p-2 my-2">
  <div className="container-fluid">
         <img
           src="https://images.shiksha.com/mediadata/images/1571990208phpCoii2i.jpg"
            style={{width: "100px", height: "100px"}}
            alt="logo"
           />
   <NavLink to="/" className="navbar-brand  "><SinhgadFace className="">Sinhgad Face</SinhgadFace></NavLink>
    <button className="navbar-toggler d-none d-sm-block" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
         
      
      </ul>
    </div>
  </div>
            </nav>
             
         </Fragment>

         <div className="container mb-5">
            <div className="row">
                <div className="col-md-6  col-12 d-flex flex-column  align-items-start">
                  <TotalUser>
                   <h1>Total Users</h1>
                  </TotalUser>
                  <TotalUserCount>
                    <h1 className="display-1 ">{count}...</h1>
                  </TotalUserCount>
                </div>
                <div className="col-md-6 col-12">
                     <LoginScreen/>
                </div>
            </div>
        </div>

        <Footer />
        </>


        
    );
}

export default LandingPage;