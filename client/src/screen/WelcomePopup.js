import React from "react";
import styled from "styled-components";

const PopContainer = styled.div`
   position:fixed;
   top:0;
   left:0;
   width:100%;
   height:100vh;
   background-color: rgba(0,0,0,0.7);
   display: flex;
   flex-direction:row
   justify-content:center
   align-items:center;
`
const InnerPop = styled.div`
    color:black;
    background-color: rgba(255,255,255,0.9);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
    width:70%;
    height:50vh;
    margin:auto;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:15px;
    h5{
      line-height:2.2rem
    }
    
    @media (max-width:700px){
       width:100%;
       h5{
        line-height:1.5rem
      }
    }
  
   
`
const WelcomePopup = (props) =>{
   return(props.trigger)? (
      <PopContainer>
        <InnerPop >
          <div className="col-lg-12  p-5">
            <h5>
            Hello folks! <br/>This page is just for community purposes I urge you all to share this link [ https://sinhgad-net.herokuapp.com/ ] among other students (SIOM College Only). By doing we could create a better student community to help each other on various platforms. Thank You.
            </h5>
          </div>
          <div>
            <button className=" btn btn-danger" onClick={()=>props.setTrigger(false)}>Close</button>
            </div>
        </InnerPop>
      </PopContainer>
   ): ""
}

export default WelcomePopup