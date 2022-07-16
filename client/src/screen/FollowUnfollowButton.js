import {React} from 'react';
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";




 const FollowUnfollowButton = ({id})=> {
      
    const auth = localStorage.getItem("userInfo");
      const [toggle, setToggle] = useState(false);


      const handleFollower= async (id) => {
          const data = {
           userId : JSON.parse(auth)._id,
          }
           const  {res} =  await axios.put(`/api/users/${id}/follow`, data);
           console.log(res);
       }
       
       const handleUnFollower = async (id) => {
        const data = {
         userId : JSON.parse(auth)._id,
        }
         const  {res} =  await axios.put(`/api/users/${id}/unfollow`, data);
         console.log(res);
     }
   


    //  useEffect(()=>{
    //     const getFollowers = async () =>{
    //         const {data} = await axios.get(`/api/users/`)
    //         console.log(data.data)
    //         data.data.map(item=>{
    //              console.log(item.followers)
    //                 if(item.followers.includes(JSON.parse(auth)._id)){
    //                     setToggle(true)
    //                 }
    //         })
    //     }
    //     getFollowers();
    // },[])

   

    return(
        <>
            <button 
            style={toggle ? {backgroundColor: "green"} : {backgroundColor: "grey"}}
            type="button" 
            class="btn btn-secondary p-2 mx-1" 
            onClick={()=>{setToggle(!toggle); handleFollower()}}>{toggle ? "Following" : "Follow"}</button>
           <button onClick={(e)=> handleUnFollower()} type="button" class="btn btn-secondary p-2 mx-1">Unfollow</button>
        </>
    )
}

export default FollowUnfollowButton;