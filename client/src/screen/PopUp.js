import React from "react";
import styled from "styled-components";

const PopContainer = styled.div`
   position:fixed;
   top:0;
   left:0;
   width:100%;
   height:100vh;
   background-color: rgba(0,0,0,0.2);
   display: flex;
   flex-direction:row
   justify-content:center
   align-items:center;
`
const InnerPop = styled.div`
    color:black;
    background-color: rgb(255,255,255,0.9);
    width:50%;
    margin:auto;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:15px;
    &:hover{
      transition: all 1s ease-in-out;
      width:30%;
    }
    @media (max-width:700px){
       width:100%;
       &:hover{
        width:100%;
      }
    }
  
   
`
const Popup = (props) =>{
   return(props.trigger)? (
      <PopContainer>
        <InnerPop >
          <div className="col-lg-12  p-5">
            <h5>
            Hello folks!<br/>
            If you have any queries.  You could send it here.<br/>
            Your Name: XYZ<br/>
            Subject: Account related<br/>
            Queries: I have a query regarding...<br/>
            </h5>
          </div>
          <div>
            <button className="mb-4 btn btn-danger" onClick={()=>props.setTrigger(false)}>Close</button>
            </div>
        </InnerPop>
      </PopContainer>
   ): ""
}

export default Popup