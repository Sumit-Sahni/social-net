import React from "react";
import { useEffect, useState,} from "react";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";





const AllPost = () => {

  console.log();
    const auth = localStorage.getItem("userInfo");
    const [posts, setPosts] = useState([])

  //  Get all posts from the database

   useEffect(()=>{
     const getPost = async () =>{
     const {data} = await axios.get(`/api/posts/fetchallposts`);
       setPosts(data);
       console.log(data)
     }
     getPost();
 },[])


  // *******************************************LIKE***********************************************************************************
  const getLikes = async (id) =>{
   const data = {
     userId : JSON.parse(auth)._id,
   }
    await axios.put(`/api/posts/${id}/likes/`, data);
    window.location.reload();    
 }

      

   return(
       <>
       {
            posts.map((post, index)=>{
                return( 
                    <div key={index} >
                      
                      <div className="container"> 
                    
                        <div className="row">
                                <div className="col-lg-12 col-12">
                                <div className="card w-100 mt-2" >
                                 <div className="card-body ">
                                    <div className="row w-50">
                                    <div className="col-md-12 d-flex  align-items-center">
                                       <NavLink to={`/viewprofile/${post.user._id}`}>
                                        <div>
                                           <img src={`${post.user.pic}`} alt={"img"} style={{width:"50px", height:"50px", borderRadius:"50%", objectFit:"cover"}}></img>
                                        </div >
                                      </NavLink>
                                        <div className="mx-3">
                                        <p>by. {post.user.name.toUpperCase()}</p>
                                        </div>
                                       </div>
                                    </div>
                                   <h6 className="card-subtitle mb-2 my-2 text-muted">About : {post.title}</h6>
                                   <p className="card-text">{post.article}</p>
                                   <div className="row ">
                                    <div className="col-lg-12 d-flex justify-content-between ">
                                      <div className="d-flex flex-row align-items-center ">
                                            <div>
                                             <i onClick={()=>getLikes(post._id)}style={{"cursor":"pointer"}}>
                                             {
                                                post.likes.includes(`${JSON.parse(auth)._id}`) ? <i className="fa-lg bi bi-suit-heart-fill mx-2" style={{"color":"red"}}></i> :<i className="fa-lg bi bi-suit-heart mx-2" ></i>
                                             }
                                             </i>
                                            </div>
                                            <div className="mx-2 mt-2">
                                               <p>{post.likes.length}</p>
                                            </div>
                                        </div>
                                        <div>
                                           <p className=" text-end ">{moment(post.created_at).format("MMM Do YYYY,")}</p>
                                        </div>
                                    </div>
                                        
                                   </div>
                                 </div>
                               </div>
                                </div>
                              </div>
                      </div>
                    </div>
                )
            })
       }
       </>
   )

}

export default AllPost;