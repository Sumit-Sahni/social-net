import {React} from "react";
import  {useState} from "react";
import axios from "axios";
import { NavLink} from "react-router-dom";
import Loading from "../Components/Loading";





const AddVideos = () => {
    
        const auth = localStorage.getItem("userInfo");
        const [title, setTitle] = useState("");
        const [videos, setVideos] = useState("");
        const [loading, setLoading] = useState(false);
       
        
      
        const videoPost = (videos) =>{
        setLoading(true);
        const data = new FormData();
        data.append("file", videos);
        data.append("upload_preset", "sumitsahni");
        data.append("cloud_name", "djznye1yd");
        
        fetch("https://api.cloudinary.com/v1_1/djznye1yd/video/upload",{
          method: "post",
          body: data
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setVideos(data.url);
          alert("Video Uploaded");
          setLoading(false);
          console.log(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          console.log("error");
         })
         }
        
         
        const submitHandler =  async() => {
        
         try{
          const data = {
            title,
            videos,
         }
        await axios.post(`/api/videos/create/${JSON.parse(auth)._id}`, data);
        console.log(data);
        setTitle("");
        setVideos("");
         }catch(error){
            console.log("Error Video Uploading");
         }
        }


    

      return(
        <>
    
         <form onSubmit={submitHandler }>
        
            <div className="row">
              <div  className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">Title</label>
                 <input className="form-control w-100 mb-3" id="name" aria-describedby="emailHelp"
                  type="name" 
                  value={title}
                  placeholder="Title"
                  onChange={(e)=>setTitle(e.target.value)}
             />
              </div>
              <div className="col-md-12 mb-3">
              <div className="form-group ">
            <label className="mb-2" htmlFor="file">Upload Your Video: File Size less than 100 MB </label>  
            <input  className="form-control w-50" id="file"
                  onChange={(e)=> videoPost(e.target.files[0])}
                  type="file"
                  placeholder="Video"
            />
            </div>
              </div>
            </div>
             {loading && <Loading/>}
            <button type="submit" className="btn btn-primary my-2">Post</button>
         </form>
        </>
      )
    }


export default AddVideos;