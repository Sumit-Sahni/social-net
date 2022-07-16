import {React} from "react";
import  {useEffect, useState, Fragment} from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import moment from "moment"; 
import { HomeContainer } from "./styled/Home.styled";
import AddPost from "./addPost";




const StyledProfile = styled.div`
    //   border: 1px solid #ccc;
`

const MyProfile = () => {
    const auth = localStorage.getItem("userInfo");
    const [User, setUser] = useState([]);

    
   useEffect(()=>{
    const getUser = async () =>{
    const {data} = await axios.get(`/api/users/userbyid/${JSON.parse(auth)._id}`);
     console.log(data);
     setUser([data]);
    }
    getUser();
  },[])


      //  **********************************UPDATE**********************************************
   
     
      
      const updateGender = async (id) =>{
        const newGender = prompt("Enter your Gender");
        await axios.put(`/api/users/${id}`,
        {gender:newGender})
      }
      
      const updateDate = async (id) =>{
        const newDate = prompt("Enter in this formate: yyyy-months-date (1947-05-25)");
        await axios.put(`/api/users/${id}`,
        {date:newDate})
      }
      const updateAbout = async (id) =>{
        const newAbout = prompt("Update your About section");
        await axios.put(`/api/users/${id}`,
        {about:newAbout})
      }
      const updateCollege = async (id) =>{
        const newCollege = prompt("Update Your College");
        await axios.put(`/api/users/${id}`,
        {college:newCollege})
      }
      
      //  **********************************UPDATE**********************************************
   

    return(
         <>
          <HomeContainer>
        <Fragment>
            <nav className="navbar navbar-expand-lg bg-body p-2 my-2">
  <div className="container-fluid">
  <NavLink to="/welcome" className="navbar-brand">Home</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <NavLink to="/" className="nav-link active" aria-current="page">About</NavLink>
        </li> */}
      </ul>
      <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
        
      </ul>
    </div>
  </div>
            </nav>
             
         </Fragment>
         </HomeContainer>
         {
            User.map((users, index) =>{
                return(
                    <StyledProfile className="container mt-5 py-3 p-4" key={index}>
                        <div className="row justify-content-start ">
                            <div className="col-md-3  p-2 d-flex flex-column  ">
                                <div>
                                <img src={`${users.pic}`} alt={"img"} style={{width:"180px", height:"180px", borderRadius:"50%", objectFit:"cover"}}></img>
                                </div>
                            <div className="d-flex flex-column  justify-content-center  my-2">
                                <h5>Name: {users.name}</h5>
                                <p>Email: {users.email}</p>
                                <div className="row ">
                                </div>
                                <div className="row " >
                                    <div className="col-md-10 d-flex flex-row   ">
                                      <div>
                                      <p >Gender: {users.gender}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                        <i onClick={()=>updateGender(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div>
                                      <p >D.O.B: {moment(users.date).format("MMM Do YYYY")}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                         <i onClick={()=>updateDate(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div >
                                        <p>About: {users.about}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                         <i onClick={()=>updateAbout(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row   ">
                                      <div>
                                        <p>College: {users.college}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                         <i onClick={()=>updateCollege(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div> 
                            </div>
                            </div>
                            <div className="col-md-4 p-6 mt-5">
                                <AddPost/>
                            </div>
                            <div className="col-md-5 p-5 " style={{"overflow-y": "auto", height: "60vh", border: "none"}}>
                              
                            </div>
                        </div>
                    </StyledProfile>
                )
            }) 
         }
         </>
    );
}

export  default MyProfile;