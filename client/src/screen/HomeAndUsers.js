import React from "react";
import FetchAllUsers from "./FetchAllUsers";
import AllPosts from "./AllPosts";
import styled from "styled-components";


const ProfileScroll = styled.div`
 ::-webkit-scrollbar {
  width: 10px;
 },
  ::-webkit-scrollbar-track {
  // background: #f1f1f1;
  },
  ::-webkit-scrollbar-thumb {
  background-color: rgba(179, 179, 179, 0.1);
  }
  overflow-y: scroll;
  height: 65vh;
  bordr: none;

  @media (max-width: 480px) {
    height: 45vh;
`
const TimelineScroll = styled.div`
  height: 75vh;
  overflow-y: scroll;


 
`

const HomeAndUsers = () => {

 
    return (
       <>
           <div className="container ">
          <div className="row">
            <div  className="col-md-3  col-12" >
            <ProfileScroll>
                 <FetchAllUsers/>
                 </ProfileScroll>
            </div>
            
            <div className="col-md-6 col-lg-6 col-12 col-5 text-center mt-3 ">
                <h1 className="py-4">Timeline</h1>
                <TimelineScroll>
                  <AllPosts/>
                </TimelineScroll>
            </div>
          </div>
          </div>
       </>
    );
}

export default HomeAndUsers;