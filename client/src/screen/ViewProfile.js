import React from "react";
import { useEffect, useState, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment"; 
import styled from "styled-components";
import FetchUserVideo from "./fetchUserVideo";



const StyledProfile = styled.div`
`
const DisplayVideo = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column!important;
  }
`
// const VideoSection = styled.div`
//    background-color: black;
// `
const ViewProfile = ({p}) => {
    const auth = localStorage.getItem("userInfo");
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState("Like");
    

  


    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/users/userbyid/${id}`);
            console.log(data);
            console.log(data.posts);
            setPosts(data.posts);
            console.log(data.videos);
            setUser([data]);
            setLikes(true);
         
        }
        getUser();
    }, [id]) 

   
    
   
 
        const getLikes = async (id) =>{
      const data = {
        userId : JSON.parse(auth)._id,
      }
       await axios.put(`/api/posts/${id}/likes/`, data);
       window.location.reload(); 
        
    }
     
   
  

    return(
        <>
   
             <Fragment>
            <nav className="navbar navbar-expand-lg bg-dark p-4">
  <div className="container-fluid">
  <NavLink to="/welcome" className="navbar-brand text-white">Back</NavLink>
    <button className="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
        {
            user.map((users, index) =>{
                return(
                    <StyledProfile className="container mt-5 p-5" key={index}>
                        <div className="row justify-content-start ">
                            <div className="col-md-12 col-lg-4 p-2 d-flex flex-column  ">
                                <div>
                                <img src={`${users.pic}`} alt={"img"} style={{width:"180px", height:"180px", borderRadius:"50%", objectFit:"cover"}}></img>
                                </div>
                             <div className="d-flex flex-column  justify-content-center  my-2">
                                <h5>{users.name}</h5>
                                <p>Email: {users.email}</p>
                                <div className="row " >
                                    <div className="col-md-10 d-flex flex-row   ">
                                      <div>
                                      <p >Gender: {users.gender}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}> </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div>
                                      <p >D.O.B: {moment(users.date).format("MMM Do YYYY")}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}> </div>                                                                           
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div >
                                        <p>About: {users.about}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row ">
                                      <div>
                                        <p>College: {users.college}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}></div>
                                    </div>
                                </div> 

                                <div className="row ">
                                    <div className="col-md-12 d-flex flex-row ">
                                      <div>
                                        <p><strong>{users.followers.length}</strong> Follower</p>
                                      </div>
                                        <div style={{cursor:'pointer'}}></div>
                                    </div>
                                </div> 
                                <div className="row ">
                                    <div className="col-md-12 d-flex flex-row ">
                                      <div>
                                        <p><strong>{users.followings.length}</strong> Following</p>
                                      </div>
                                        <div style={{cursor:'pointer'}}></div>
                                    </div>
                                </div> 
                            </div>
                            </div>
                            <div className="col-md-12 col-lg-6 col-12  p-2 " style={{"overflow-y": "auto", height: "60vh", width:"115vh", border: "none"}}>
                                <div>
                               {
                                    posts.map((post, index) =>{
                                        return(
                                            <div className="row justify-content-start " key={index}>
                                                <div className="col-md-12 p-2 d-flex flex-column  ">
                                                    <div className="d-flex flex-row  justify-content-between  my-2">
                                                        <p>{moment(post.created_at).format("MMM Do YYYY")}</p>
                                                    </div>
                                                    <div className="d-flex flex-column  justify-content-center  my-2">
                                                        <h5>{post.title}</h5>
                                                        <p  style={{"font-family": `'Josefin Sans', 'sans-serif'`}} >{post.article}</p>
                                                         <div className="col-1 d-flex flex-row align-items-center ">
                                                          
                                                          <i onClick={()=>getLikes(post._id)}style={{"cursor":"pointer"}} >
                                                             {
                                                                post.likes.includes(`${JSON.parse(auth)._id}`) ? <i className="fa-lg bi bi-suit-heart-fill mx-2" style={{"color":"red"}}></i> :<i className="fa-lg bi bi-suit-heart mx-2" ></i>
                                                             }
                                                            </i> 
                                                          <div className="mt-3"> <p>{post.likes.length}</p></div>
                                                         </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                               }
                                </div>
                            </div>
                        </div>
                    </StyledProfile>
                )
            }) 
         }
        
          <div className="container  pt-4">
           <div className="row">
              <DisplayVideo className="col-lg-12  d-flex flex-row gap-2 ">
                 <FetchUserVideo  />
              </DisplayVideo>
            </div>
          </div>  
         
       </>
    )



}

 export default ViewProfile;