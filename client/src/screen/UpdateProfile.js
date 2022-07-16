import {React} from "react";
import axios from "axios";
import { useParams } from "react-router";
import  {useEffect, useState, Fragment} from "react";


const UpdateProfile = () => {
    const [User, setUser] = useState([]);
    const {id} = useParams();
    const params = useParams();
    console.log(id);
  
   useEffect(()=>{
        const getUser = async () =>{
        const {data} = await axios.get(`/api/users/${params.id}`)
         console.log(data);
         setUser(data);
        }
        getUser();
   },[])

    return (
        <div>
        <h1>Update Profile</h1>
        </div>
    );
}

export default UpdateProfile;