import {React} from "react";
import  {useState} from "react";
import axios from "axios";




const AddVideos = () => {
    //  const auth = localStorage.getItem("userInfo");

     const [title, setTitle] = useState("");
        const [videos, setVideos] = useState([]);

    const submitHandler =  async(e) => {
       e.preventDefault(); 
        let formdata = new FormData();
        for(let key in videos){
            formdata.append("videos", videos[key]);
        }
        formdata.append("title", title);
        await axios.post("/api/videos/create", formdata).then(res => {
            alert("Video Added Successfully");
        });
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
            <label htmlFor="video">Upload Your Video</label>  
            <input
                type="file"
                name="video"
                id="videos"
                className="form-control"
                accept="video/*"
                onChange={(e)=>setVideos(e.target.value)}
            />
            </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary my-2">Post</button>
         </form>
        </>
      )
}

export default AddVideos;