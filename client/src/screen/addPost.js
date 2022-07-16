import {React} from "react";
import  {useEffect, useState, Fragment} from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";


const AddPost = () => {
     const auth = localStorage.getItem("userInfo");
     const [title, setTitle] = useState("");
     const [article, setArticle] = useState("");

    const submitHandler =  async() => {
        const data = {
            title,
            article,
        }
        await axios.post(`/api/posts/makepostbyuserid/${JSON.parse(auth)._id}`, data);
        console.log(data);
        setTitle("");
        setArticle("");
    }
    

      return(
        <>
         <form onSubmit={submitHandler }>
        
            <div className="row">
              <div className="col-md-12">
              <label htmlFor="name" className="form-label">Title</label>
                 <input className="form-control w-100 mb-3" id="name" aria-describedby="emailHelp"
                  type="name" 
                  value={title}
                  placeholder="Title"
                  onChange={(e)=>setTitle(e.target.value)}
             />
              </div>
              <div className="col-md-12">
              <div className="form-group ">
             <label htmlFor="exampleFormControlTextarea1" className="mb-3">About above Title<span></span></label>
             <textarea className="form-control  " id="exampleFormControlTextarea1"  rows="10"  
               type="text"
                value={article}
                placeholder="Your Thoughts"
                onChange={(e)=>setArticle(e.target.value)}
             ></textarea>
            </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary my-2">Post</button>
         </form>
        </>
      )
}

export default AddPost;