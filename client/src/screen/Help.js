import { NavLink} from "react-router-dom";
import emailjs from "@emailjs/browser"
import React, {useRef} from 'react';




const Help = () => {
  const auth = localStorage.getItem("userInfo");

   const form = useRef();
    const sendEmail = (e) =>{
        e.preventDefault();

        emailjs.sendForm('service_jdav3e7', 'template_mvz7wtx', e.target, '7z6wQnsHVTCn2Q-P4')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
    }

    return (
         <>
          <nav className="navbar navbar-expand-lg bg-dark p-4 ">
  <div className="container-fluid">
    <button className="navbar-toggler border " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul  className="navbar-nav me-auto  mb-lg-0">
        
        <li>
        <NavLink to="/welcome" className="nav-link text-white">Home</NavLink>
        </li>
      </ul>
    </div>
  </div>
    
      </nav>  
            <div className="container">
                <form ref={form} onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                          <input type="text" className="form-control" placeholder="Your Name" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto d-lg-none d-none">
                          <input value={`${JSON.parse(auth).email}`} type="email" className="form-control" placeholder="Your Email Address" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2  mx-auto">
                          <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2  mx-auto">
                            <textarea className="form-control" placeholder="Your Query" name="message"></textarea>
                        </div>
                        <div className="col-8 form-group pt-3  mx-auto">
                        <button type="submit"  className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
         </>
    );
}

export default Help;