import React, { Fragment} from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading";
import { NavLink} from "react-router-dom";




const RegisterScreen = () => {
 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("");
    const [conform, setConform] = useState("");
    const [loading, setLoading] = useState(false);
    const [pic, setpic] = useState("");
    const [phone, setPhone] = useState("");
    const [college, setCollege] = useState("");
    const [about, setAbout] = useState("");
  

    
    

    const postDetail = (pic) =>{
      if(!pic){
         return alert("Please Select an Image");
      }if( pic.type === "image/png" || pic.type === "image/jpeg"){
         
     const data = new FormData();
     data.append("file", pic);
     data.append("upload_preset", "sumitsahni");
     data.append("cloud_name", "djznye1yd");
     fetch("https://api.cloudinary.com/v1_1/djznye1yd/image/upload",{
       method: "post",
       body: data
     })
     .then(res => res.json())
     .then(data => {
       console.log(data);
       setpic(data.url);
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
        if (password !== conform) {
            alert("Password does not match");
        }
        else{

          try{
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
              setLoading(true);
             const {data} = await axios.post("/api/users",
              {
                  email,
                  password,
                  name,
                  date,
                  gender,
                  pic,
                  phone,
                  college,
                  about,
                  
              },
              config
              
              );
        
                console.log(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                alert("Registration Successful");
                window.location.href = "/welcome"; 
               
                
      }catch(error){
            setLoading(false);
            alert("Check Your Email and Password & Every field is required");
            window.location.reload()
 
        }
        
      }
        setName("");
        setEmail("");
        setPassword("");
        setConform("");
        setpic("");
        setPhone("");
        setDate("");
        setGender("");
        setCollege(""); 
        setAbout(""); 
    }

       
    return (

    <Fragment>
        <Fragment>
            <nav className="navbar navbar-expand-lg  bg-body navbar-fixed-top p-4">
  <div className="container-fluid">
         <img
           src="https://images.shiksha.com/mediadata/images/1571990208phpCoii2i.jpg"
            style={{width: "100px", height: "100px"}}
             alt="logo"
           />
    <NavLink to="/" className="navbar-brand mx-5">Home</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    </div>
  </div>
            </nav>
        <div>
            
        </div>
        </Fragment>
    {loading && <Loading />}
    <form className="container " onSubmit={submitHandler}>
    <div className="row p-4">
        <div className="  col-md-6 col-12 ">
        <div className="mb-3 ">
           <label htmlFor="name" className="form-label">Name</label>
           <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
           <input className="form-control w-70" id="name" aria-describedby="emailHelp"
              type="name" 
                value={name}
                placeholder="Full Name"
                onChange={(e)=>setName(e.target.value)}
             />
           
       </div>
        </div>
        <div className=" col-12 col-md-6 mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
           <input className="form-control w-70" id="email" aria-describedby="emailHelp"
               type="email" 
               value={email}
               placeholder="Email"
               onChange={(e)=>setEmail(e.target.value)}
             />
        </div>

        <div className="col-md-6 mb-3">
        <label htmlFor="file" className="form-label">Profile picture</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
          <input className="form-control w-70" id="file"
             onChange={(e)=> postDetail(e.target.files[0])}
            type="file"
            placeholder="Profile Picture"
          />  
        </div>

        <div className="col-md-6 mb-3">
        <label htmlFor="college" className="form-label">College</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
           <input className="form-control w-70" id="college" aria-describedby="emailHelp"
              type="name" 
                value={college}
                placeholder="College Name"
                onChange={(e)=>setCollege(e.target.value)}
              />
        </div>
        <div className="col-md-6 mb-3">
        <label htmlFor="about" className="form-label">About</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
           <input className="form-control w-70" id="about" aria-describedby="emailHelp"
               type="name" 
                value={about}
                placeholder="About"
                onChange={(e)=> setAbout(e.target.value)}
              />
        </div>

        <div className="col-md-6 mb-3">
        <label htmlFor="current-password" className="form-label">Date Of Birth</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
          <input 
          id='OpenDate'
          className="form-control w-70"
          name='date' 
          type='date'
          value={date}
          onChange={(e)=>setDate(e.target.value)}
         
        />
        </div>

        <div className="col-md-6 mb-3">
        <label htmlFor="gender" className="form-label">Gender</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
            <select onChange={(e)=> setGender(e.target.value)}  className="form-control w-70" id="gender"  placeholder="Gender">
              <option selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
        </div>
        <div className="col-md-6 mb-3">
        <label htmlFor="current-password" className="form-label">Password</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
          <input  className="form-control w-70" id="current-password"
             type="password" 
             value={password}
             placeholder="password"
             onChange={(e)=>setPassword(e.target.value)}
            />
        </div>
        <div className="col-md-6 mb-3">
        <label htmlFor="confpassword" className="form-label">CNF Password</label>
        <i style={{color:"red", fontSize:"8px"}} className="bi bi-asterisk mx-3"></i>
          <input  className="form-control w-70" id="confpassword"
               type="password" 
               value={conform}
               placeholder="confirm password"
               onChange={(e)=>setConform(e.target.value)}
            />
          </div>
    </div>
      <button type="submit" className="btn btn-primary my-4 mx-4">Register</button>
      <NavLink to="/"><button  className="btn btn-primary mx-2">Login</button></NavLink>
 </form>
    
  </Fragment>

         

    );
}

export default RegisterScreen;