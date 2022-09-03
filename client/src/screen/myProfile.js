import {React} from "react";
import  {useEffect, useState, Fragment} from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import moment from "moment"; 
import { HomeContainer } from "./styled/Home.styled";
import AddPost from "./addPost"
import Footer from "./footer";
import AddVideos from "./addVideos";
import FetchUserVideo from "./fetchUserVideo";


const DisplayVideo = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column!important;
  }
`

const FollowerScroll = styled.div`
 ::-webkit-scrollbar {
  width: 0px;
 },
  // ::-webkit-scrollbar-track {
  // background: #f1f1f1;
  // },
  ::-webkit-scrollbar-thumb {
  background-color: rgba(179, 179, 179, 0.1);
  }
  overflow-y: scroll;
  height: 35vh;
  bordr: none;
  

  @media (max-width: 480px) {
    height: 25vh;
`





const StyledProfile = styled.div`
    background-color:#181818;
    color:white;
`

const MyProfile = () => {
    const auth = localStorage.getItem("userInfo");
    const [User, setUser] = useState([]);
    const [Posts, setPosts] = useState();
    const [users_followers, setUsersFollowers] = useState([]);
    const [pic, setpic] = useState("");

    
    useEffect(()=>{
      const getAllUsers = async () =>{
        const {data} = await axios.get("/allusers")
        setUsersFollowers(data.data) 
     }
      getAllUsers();
    },[])



   useEffect(()=>{
    const getUser = async () =>{
    const {data} = await axios.get(`/api/users/userbyid/${JSON.parse(auth)._id}`)
       setUser([data]);
       setPosts(data.posts);
     
    }
    getUser();
  },[])


      //  **********************************UPDATE**********************************************
   
     
      
      const updateGender = async (id) =>{
        const newGender = prompt("Enter your Gender");
        await axios.put(`/api/users/${id}`,
        {gender:newGender})
        window.location.reload()
      }
      
      const updateDate = async (id) =>{
        const newDate = prompt("Enter in this formate: yyyy-months-date (1947-05-25)");
        await axios.put(`/api/users/${id}`,
        {date:newDate})
        window.location.reload()
      }
      const updateAbout = async (id) =>{
        const newAbout = prompt("Update your About section");
        await axios.put(`/api/users/${id}`,
        {about:newAbout}) 
        window.location.reload()
      }
      const updateCollege = async (id) =>{
        const newCollege = prompt("Update Your College");
        await axios.put(`/api/users/${id}`,
        {college:newCollege})
        window.location.reload()
      }
// *******************************************************************UPADATEPICTURE*************************************
const postDetail = (pic) =>{
  if(!pic){
     return alert("Please Select an Image");
  }if( pic.type === "image/png" || pic.type === "image/jpeg"){
     
 const data = new FormData();
 data.append("file", pic);
 data.append("upload_preset", "sumitsahni");
 data.append("cloud_name", "djznye1yd");
 fetch("https://api.cloudinary.com/v1_1/djznye1yd/image/upload",{
   method: "post",
   body: data
 })
 .then(res => res.json())
 .then(data => {
   console.log(data);
   setpic(data.url);
   console.log(data);
 })
 .catch(err => {
   console.log(err);
   console.log("error");
  })
  }else{
       alert("Please Select an Image");
  }
  }
    
      const updatePic = async (id) =>{
        const newPic = pic;
        await axios.put(`/api/users/${id}`,
        {pic:newPic})
        window.location.reload()
      }
      
      //  **********************************LIKES**********************************************
   
      const getLikes = async (id) =>{
        const data = {
          userId : JSON.parse(auth)._id,
        }
         await axios.put(`/api/posts/${id}/likes/`, data);
         window.location.reload(); 
          
      }
    // **********************************UNFOLLOW FROM PROFILE**********************************************

  //   const handleUnFollow = (id) =>{
  //     const data = {
  //         userId: JSON.parse(auth)._id,
  //     }
  //     axios.put(`api/users/${id}/unfollow`, data)
  //     window.location.reload()
  // }



    return(
         <>
          <HomeContainer>
        <Fragment>
            <nav className="navbar navbar-expand-lg p-4" style={{boxShadow: "rgb(37 37 255 / 25%) 0px 50px 100px -20px, rgb(91 109 255 / 30%) 0px 30px 60px -30px",backgroundColor:"#181818"}}>
  <div className="container-fluid">
  <NavLink to="/welcome" className="navbar-brand text-white">Home</NavLink>
    <button className="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <button className="nav-link   bg-dark text-white " style={{border:"none"}} onClick={()=>{
           localStorage.removeItem("userInfo");
               window.location.href = "/";
           }}>Sign out</button> 
        </li>
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
                    <StyledProfile className=" py-5 p-5" key={index}>
                        <div className="row justify-content-start ">
                            <div className="col-md-6 col-lg-4 p-2 d-flex flex-column  ">
                                <div>
                                <img src={`${users.pic}`} alt={"img"} style={{width:"180px", height:"180px", borderRadius:"50%", objectFit:"cover"}}></img>
                                </div>
                               
                            <div className="d-flex flex-column  justify-content-center  my-2">
                                <h5>Name: {users.name}</h5>
                                <p className="fw-semibold">Email : {users.email}</p>
                                <div className="row ">
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-12 d-flex flex-row  ">
                                    <input
                                      style={{ width:"220px", textAlign:"center", opacity:"0.6"}}
                                      placeholder="Edit Profile"
                                      text="center"
                                      type="file"
                                      onChange={(e)=> postDetail(e.target.files[0])}
                                      
                                   />
                                   <p className="mx-3 ">Edit Profile</p>
                                        <div style={{cursor:'pointer'}}>
                                         <i onClick={()=>updatePic(users._id)} className="bi bi-cloud-arrow-up   text-primary"></i>
                                       </div>
                                    </div>
                                </div>

                                <div className="row " >
                                    <div className="col-md-10 d-flex flex-row   ">
                                      <div>
                                      <p  className="fw-semibold">Gender : {users.gender}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                        <i onClick={()=>updateGender(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div>
                                      <p  className="fw-semibold" >D.O.B : {moment(users.date).format("MMM Do YYYY")}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                         <i onClick={()=>updateDate(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div>
                                        <p  className="fw-semibold">About : {users.about}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                         <i onClick={()=>updateAbout(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row   ">
                                      <div>
                                        <p  className="fw-semibold">College : {users.college}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                         <i onClick={()=>updateCollege(users._id)} className="bi bi-pencil mx-5 text-primary"></i>
                                       </div>
                                    </div>
                                </div> 

                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row   ">
                                      <div>
                                        <p><strong>{users.followers.length}</strong> Followers</p>
                                    </div>               
                                    </div>

                                    <div>
                                        <p><strong>{users.followings.length}</strong> Followings</p>
                                    </div>
                                </div> 

                            </div>
                            </div>
                            <div className="col-md-5 col-lg-4 py-3 ">
                                <AddPost/>
                            </div>

                            <div className="col-md-5 col-lg-4 ">
                                <h1 className="fs-2 text-center" style={{"font-family": `'Josefin Sans', 'sans-serif'`}} >Followers</h1>
                                <FollowerScroll>
                                {
                                  users_followers.map((users_followers, index) =>{
                                    return(
                                        <div className="row " key={index}>
                                            <div className="col-md-12">
                                                <div className="">
                                                  {
                                                     users_followers.followings.includes(`${JSON.parse(auth)._id}`)?
                                                    (
                                                        <div className="row d-flex align-items-center justify-content-center">
                                                           <div className="col-lg-2  col-2">
                                                           <NavLink to={`/viewprofile/${users_followers._id}`}>
                                                             <img className="mx-auto" src={`${users_followers.pic}`} alt={"img"} style={{width:"50px", height:"50px", borderRadius:"50%", objectFit:"cover"}}></img>
                                                          </NavLink> 
                                                      
                                                           </div>
                                                           <div className="col-lg-2 col-2">
                                                           <div>
                                                        <h6 className="mt-1 " style={{"font-family": `'Josefin Sans', 'sans-serif'`}} >{ users_followers.name.charAt(0).toUpperCase()+ users_followers.name.slice(1)}</h6>
                                                        {/* <button onClick={()=>handleUnFollow(users.followers._id)} type="button" className="btn btn-secondary" >Unfollow</button> */}
                                                        </div>   
                                                           </div>
                                                        </div>
                                                    ):null
                                                    
                                                    }  
                                                </div>
                                                <div className="d-flex flex-column  justify-content-center  my-2">                                                
                                                    <div className="row ">
                                                     
                                                    </div>
                                                    <div className="row " >
                                                        <div className="col-md-10 d-flex flex-row ">
                                                          <div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                  })
                                }
                                </FollowerScroll>
                            </div>
                                 
                        </div>

                        <AddVideos className="my-2"/>

                        <div className="container  pt-4">
                        <h1 className="py-4 mx-2 text-center" style={{"font-family": `'Josefin Sans', 'sans-serif'`}} >My Videos</h1>
                                        <div className="row">
                                   <DisplayVideo className="col-lg-12 d-flex flex-row gap-2 ">
                                   <FetchUserVideo />
                                  </DisplayVideo>
                             </div>

                        </div>  

                        <div className="row justify-content-center mt-5">
                        <h1 className="text-center position-sticky pb-3">My Posts</h1>
                        <hr></hr>
                        <div className="col-md-12 p-5 col-lg-12 " style={{"overflow-y": "auto", height: "60vh", border: "none"}}>
                            
                                  {
                                    Posts.map((post, index) =>{
                                        return(
                                          <div className="row justify-content-start " key={index}>
                                          <div className="col-md-12 col-lg-12 p-2 d-flex flex-column  ">
                                              <div className="d-flex flex-row  justify-content-between  my-2">
                                                  <h5>{post.title}</h5>
                                                  <p>{moment(post.created_at).format("MMM Do YYYY")}</p>
                                              </div>
                                              <div className="d-flex flex-column  justify-content-center  my-2">
                                                  <p>{post.article}</p>
                                                   <div className="col-1 d-flex flex-row align-items-center ">
                                                    
                                                   <i onClick={()=>getLikes(post._id)} style={{"cursor":"pointer"}}>
                                                             {
                                                                post.likes.includes(`${JSON.parse(auth)._id}`) ? <i className=" fa-lg bi bi-suit-heart-fill mx-2" style={{"color":"red"}}></i> :<i className="fa-lg bi bi-suit-heart mx-2" ></i>
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

                    
                        
                    </StyledProfile>
                )
            }) 
         }
       
         </>
    );
}

export  default MyProfile;