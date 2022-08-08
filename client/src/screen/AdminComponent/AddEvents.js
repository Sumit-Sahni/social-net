import {useState} from "react";
import { NavLink} from "react-router-dom";
import axios from "axios";





const AddEvent = () => {
      const [eventpic, seteventpic] = useState("");
      const [eventTitle, setEventTitle] = useState("");
      const [eventDescription, setEventDescription] = useState("");
      const [eventDate, setEventDate] = useState("");


    const EventPic = (eventpic) =>{
        if(!eventpic){
           return alert("Please Select an Image");
        }if( eventpic.type === "image/png" || eventpic.type === "image/jpeg"){
           
       const data = new FormData();
       data.append("file", eventpic);
       data.append("upload_preset", "sumitsahni");
       data.append("cloud_name", "djznye1yd");
       fetch("https://api.cloudinary.com/v1_1/djznye1yd/image/upload",{
         method: "post",
         body: data
       })
       .then(res => res.json())
       .then(data => {
         console.log(data);
         seteventpic(data.url);
         console.log(data);
       })
       .catch(err => {
         console.log(err);
         console.log("error");
        })
        }else{
             alert("Please Select an Image");
        }
        }
          
       
        

         const submitHandler =  async(e) => {
          e.preventDefault();

          try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
             const {data} = await axios.post("/api/events",
              {
                  eventTitle,
                  eventDescription,
                  eventpic,
                  eventDate,
                  
              },
              config
              
              );
        
                console.log(data);
                alert(" Event Registration Successful");
               
                
      }catch(error){
            alert("Error while registering events"); 
        }

       e.target.reset();
      }
      
    


       return(
            <>
                  <nav className="navbar navbar-expand-lg bg-dark p-4 ">
  <div className="container-fluid">
  <NavLink to={`/welcome`} className="nav-link text-white">Home</NavLink>
    <button className="navbar-toggler border " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul  className="navbar-nav me-auto  mb-lg-0">
      </ul>
    </div>
   </div>
      </nav> 


         <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <form onSubmit={submitHandler}>
                      <div class="form-group">
                        <label for="eventTitle">Event Topics</label>
                        <input type="text" class="form-control" id="eventTitle" aria-describedby="emailHelp" placeholder="Event Topic"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}

                        />
                      </div>
                      <div className="col-md-6 mb-3">
        <label htmlFor="current-password" className="form-label">Event Date</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
          <input 
          id='OpenDate'
          className="form-control w-70"
          name='date' 
          type='date'
          value={eventDate}
          onChange={(e)=>setEventDate(e.target.value)}
         
        />
        </div>
                      <div className="col-md-6 mb-3">
                          <label htmlFor="file" className="form-label">Event picture</label>
                            <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
                            <input className="form-control w-70" id="file"
                             onChange={(e)=> EventPic(e.target.files[0])}
                              type="file"
                              placeholder="Profile Picture"
                            />  
                      </div>
                        <div class="form-group mb-3">
                           <label for="exampleFormControlTextarea1">About Event</label>
                           <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                           />
                       </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
               </form>
                 </div>
            </div>
         </div>

            </>
       )
}

export default AddEvent;


