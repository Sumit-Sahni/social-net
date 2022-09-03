import axios from 'axios';
import {useEffect, useState} from "react";
import { useParams } from "react-router";
import ReactPlayer from 'react-player';
import { NavLink } from 'react-router-dom';




const FetchUserVideo =()=> {
   const auth = localStorage.getItem("userInfo");
     const [videos, setVideos] = useState([]);
     const { id } = useParams();

     
     useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/users/userbyid/${id}`);
            setVideos(data.videos);
         
        }
        getUser();
    }, [id]) 
   
    const deleteVideoHandler = async (v_id)=>{
      const data = {
         userId : JSON.parse(auth)._id,
       }
      await axios.put(`/api/videos/delete/${v_id}`,data)
       window.location.reload()
  }

  
 
    return(
       <>
         {
            videos.map((video, key) => {
             return(
            <div>
                <ReactPlayer
                key={key}
                url={video.videos}
                width="80%"
                height="40%"
                controls={true}
                className="mx-auto"
                />
                <div className='mx-4'>
                <h6 className='mt-2'>{video.title}</h6>
                <button className="btn btn-danger " onClick={()=> deleteVideoHandler(video._id)} style={{"font-family": `'Josefin Sans', 'sans-serif'`}} >Delete</button>
                </div>
                </div>
             )
            
            })
         } 
       </>
    )
}

export default FetchUserVideo;