import react from 'react';
import { NavLink} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import moment from "moment";



const StyledProfile = styled.div`
`
const StyleArticle = styled.div`
      flex: 1;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      font-family: 'Roboto', sans-serif; 
`

const Admin = () => {
     const auth = localStorage.getItem("userInfo");
     const [AllsUsers, setAllUsers] = useState([]);
     const [searchInput, setSearchInput] = useState("");
     const [filteredResults, setFilteredResults] = useState([]);
     const [posts, setPosts] = useState([]);
    


    useEffect(()=>{
        const getAllUsers = async () =>{
          const {data} = await axios.get("/allusers")
          setAllUsers(data.data) 
          console.log(data.data)
         
       }
        getAllUsers();
      },[])
    
    
      useEffect(()=>{
        const getPost = async () =>{
        const {data} = await axios.get(`/api/posts/fetchallposts`);
          setPosts(data);
          console.log(data)
        }
        getPost();
    },[])


    const getLikes = async (id) =>{
      const data = {
        userId : JSON.parse(auth)._id,
      }
       await axios.put(`/api/posts/${id}/likes/`, data);
       window.location.reload();    
    }

      const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        console.log(searchValue)
        if (searchInput !== '') {
            const filteredData = AllsUsers.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(AllsUsers)
        }
    }


  
    const deleteUserHandler = async (id) => {
        await axios.delete(`/api/users/delete/${id}`);
        window.location.reload(); 
    }

    const deletePostHandler = async (id) => {
      await axios.delete(`/api/posts/delete/${id}`);
      window.location.reload(); 
  }






    return (
       <>
        <nav className="navbar navbar-expand-lg bg-dark p-4 ">
  <div className="container-fluid">
  <NavLink to={`/welcome`} className="nav-link text-white">{(JSON.parse(auth).name.charAt(0).toUpperCase()+JSON.parse(auth).name.slice(1))}</NavLink>
    <button className="navbar-toggler border " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul  className="navbar-nav me-auto  mb-lg-0">
        <li><NavLink to={`/AddEvent`} className="nav-link text-white">Add Events</NavLink></li>
        <li><NavLink to={`/AddEvent`} className="nav-link text-white">ADMIN</NavLink></li>

      </ul>
    </div>
    
   </div>

      </nav> 
         <div className="container">
            <div className='row'>
                <div className='col-lg-4'>
                <form className="d-flex position-sticky mx-2 my-2" role="search">
                <input className="form-control me-2" type="search" placeholder="Search Name" aria-label="Search"   onChange={(e) => searchItems(e.target.value)}/>
                <button className="btn btn-outline-primary" type="submit">Search</button>
              </form> 

          {searchInput.length > 1 ? (

filteredResults.map((users, index) => {
return(
    <StyledProfile className="container mt-5 " key={index}>
            
    <div className="col-md-12  p-2 d-flex flex-column" >
        <div>
          <img src={`${users.pic}`} alt={"img"} style={{width:"80px", height:"80px", borderRadius:"50%", objectFit:"cover"}}></img>
        </div>
    <div className="d-flex flex-column  justify-content-center  my-2">
    <h6>{users.name.charAt(0).toUpperCase()+users.name.slice(1)}</h6>
        <p>Gender: {users.gender}</p>
        <p style={{marginTop:"-1rem"}}>College: {users.college}.</p>
       
    </div>
    </div>
                <NavLink to={`/viewprofile/${users._id}`}>
                   <button type="button" className="btn btn-secondary p-2 mx-1">View Profile</button>
                </NavLink>
               
                <button  type="button" onClick={()=> deleteUserHandler(users._id)} className="btn btn-danger mx-2 " >Delete User</button>

   </StyledProfile>
   
)
})
) : (


AllsUsers.map((users, index) =>{
    return(
        <StyledProfile className="container mt-5 " key={index}>
            
                <div className="col-md-12  p-2 d-flex flex-column" >
                    <div>
                    <img src={`${users.pic}`} alt={"img"} style={{width:"80px", height:"80px", borderRadius:"50%", objectFit:"cover"}}></img>
                    </div>
                <div className="d-flex flex-column  justify-content-center  my-2">
                <h6>{users.name.charAt(0).toUpperCase()+users.name.slice(1)}</h6>
                    <p>Gender: {users.gender}</p>
                    <p style={{marginTop:"-1rem"}}>College: {users.college}.</p>
                </div>
                </div>
               
                <NavLink to={`/viewprofile/${users._id}`}>
                <button type="button" className="btn btn-secondary ">View Profile</button>
                {/* <p>{users.followers}</p> */}
                </NavLink>
                <button  type="button" onClick={()=> deleteUserHandler(users._id)} className="btn btn-danger mx-2 " >Delete User</button>

        </StyledProfile>
    )
}) 
)}
                </div>

                <div className='col-lg-8'>
                {
                    posts.map((post, index)=>{
                  return( 
                    <div key={index} >
                      
                      <div className="container"> 
                    
                        <div className="row">
                                <div className="col-lg-12 col-12 ">
                                <div className="card w-100 mt-2" >
                                 <div className="card-body  ">
                                    <div className="row w-50">
                                     <div className="col-md-12 d-flex align-items-end ">
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
                                    <div className="col-lg-12 ">
                                   <h6 className="card-subtitle  mb-2 my-2 text-muted">About : {post.title}</h6>
                                    <StyleArticle>
                                      <p className="">{post.article}</p>
                                   </StyleArticle>
                                   </div>
                                   <div className="row ">
                                    <div className=" ">
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
                                    

                                     <div className="container">
                                
                                     <div className="row">
                                        <div className="col">
                                        <button  type="button" onClick={()=> deletePostHandler(post._id)}  className="btn btn-danger mx-2 " >Delete this Post</button>

                                        </div>
                                     </div>

                                     </div>

                                        
                                   </div>
                                    

                                 </div>
            
                               </div>
                                </div>

                                
                              </div>


                              <div>
            
                    </div>
                      </div>

                      
                    </div>
                )
            })
       }


                </div>
            </div>
         </div>


       </>
    );
}

export default Admin;