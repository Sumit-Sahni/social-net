import axios from 'axios';
import {useEffect, useState} from "react";
import { useParams } from "react-router";
import ReactPlayer from 'react-player';




const FetchUserVideo =()=> {
    
     const [videos, setVideos] = useState([]);
     const { id } = useParams();

     
     useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/users/userbyid/${id}`);
            console.log(data);
            console.log(data.posts);
            setVideos(data.videos);
         
        }
        getUser();
    }, [id]) 
   

    return(
       <>
         {
            videos.map((video, key) => {
             return(
                <div key={key} >
                <ReactPlayer
                key={key}
                url={video.videos}
                width="90%"
                height="60%"
                controls={true}
                className="mx-auto"
                />
                <h6 className='mt-2'>{video.title}</h6>
                </div>
             )
            })
         } 
       </>
    )
}

export default FetchUserVideo;