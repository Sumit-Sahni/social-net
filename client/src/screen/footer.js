import React from "react";
import "./styled/CSS/footer.css";

const Footer = () => {

    return(
 
        <footer>
        <div className="footer">
        <div className="row d-flex jsutify-content-center">
        <div className="col-md-4 offset-md-4">
            <h5>Developer</h5>
            <h6>Sumit Sahni</h6>
        <a href={"#"}><i className="fa fa-facebook p-2"></i></a>
       
       <a href={"#"}><i className="fa fa-instagram  p-2"></i></a>
      
       <a href={"#"}><i className="fa fa-youtube  p-2"></i></a>
      
       <a href={"#"}><i className="fa fa-twitter  p-2"></i></a>
        </div>
       
        </div>
        
        </div>
        </footer>
        
    );
}

export default Footer;