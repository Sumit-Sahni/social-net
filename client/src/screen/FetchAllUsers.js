import {React} from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import { NavLink } from "react-router-dom";




const StyledProfile = styled.div`
    //   border: 1px solid black;
         padding:1rem;
         width: auto;
         &:hover{
         box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
         background: rgba(0,0,0,0.2);
         pointer-events: cursor;
         transform: translateX(50px);
          }
          border-radius:15px;
          transition: all 0.4s ease-in-out;
          
`

const FetchAllUsers = () => {
    const auth = localStorage.getItem("userInfo");
    const [AllsUsers, setAllUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);


    useEffect(()=>{
      const getAllUsers = async () =>{
        const {data} = await axios.get("/allusers")
        setAllUsers(data.data) 
       
     }
      getAllUsers();
    },[])
  
        // Follow/Unfollow
 
        const handleFollow = (id) =>{
            const data = {
                userId: JSON.parse(auth)._id,
            }
            axios.put(`api/users/${id}/follow`, data)
            window.location.reload()
        }
        const handleUnFollow = (id) =>{
            const data = {
                userId: JSON.parse(auth)._id,
            }
            axios.put(`api/users/${id}/unfollow`, data)
            window.location.reload()
        }

    // ***********************************Search Funtionality**********************************************************************



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

//   

    return(

        <>
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
                            { 
                            users._id.includes(`${JSON.parse(auth)._id}`)?null:
                        
                            users.followers.includes(`${JSON.parse(auth)._id}`)?<button  type="button" className="btn btn-secondary p-2 mx-1" style={{"backgroundColor":"#0d6efd"}}>Following</button>:<button onClick={()=>handleFollow(users._id)} type="button" className="btn btn-secondary p-2 mx-1" style={{"backgroundColor":"green"}}>Follow</button>
                           }
                            { 
                            users._id.includes(`${JSON.parse(auth)._id}`)?null:
                        
                            users.followers.includes(`${JSON.parse(auth)._id}`)?<button onClick={()=>handleUnFollow (users._id)} type="button" className="btn btn-secondary p-2 mx-1 bg-danger" >Unfollow</button>:null
                           }
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
                                {
                                    users._id.includes(`${JSON.parse(auth)._id}`)?<h5>You</h5>:<h6>{users.name.charAt(0).toUpperCase()+users.name.slice(1)}</h6>
                                }
                                <h6>{users.about}</h6>

                               
                            </div>
                            </div>
                           
                            <NavLink to={`/viewprofile/${users._id}`}>
                            <button type="button" className="btn btn-secondary p-2 mx-1">View Profile</button>
                            {/* <p>{users.followers}</p> */}
                            </NavLink>
                           { 
                            users._id.includes(`${JSON.parse(auth)._id}`)?null:
                        
                            users.followers.includes(`${JSON.parse(auth)._id}`)?<button  type="button" className="btn btn-secondary p-2 mx-1" style={{"backgroundColor":"#0d6efd"}}>Following</button>:<button onClick={()=>handleFollow(users._id)} type="button" className="btn btn-secondary p-2 mx-1" style={{"backgroundColor":"green"}}>Follow</button>
                           }
                            { 
                            users._id.includes(`${JSON.parse(auth)._id}`)?null:
                        
                            users.followers.includes(`${JSON.parse(auth)._id}`)?<button onClick={()=>handleUnFollow (users._id)} type="button" className="btn btn-secondary p-2 mx-1 bg-danger" >Unfollow</button>:null
                           }
                
                    </StyledProfile>
                )
            }) 
      )}
            
           
       </>
    )
}

export default  FetchAllUsers;