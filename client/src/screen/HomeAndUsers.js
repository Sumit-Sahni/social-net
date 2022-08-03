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
  height: 100vh;
  bordr: none;
  

  @media (max-width: 480px) {
    height: 45vh;
`

const HomeAndUsers = () => {

 
    return (
       <>
           <div className="container ">
          <div className="row">
            <div  className="col-md-12 col-lg-4 col-12 " >
                <ProfileScroll>
                  <FetchAllUsers/>
                 </ProfileScroll>
            </div>
            
            <div className="col-md-12 col-lg-8 col-12 col-5  mt-3 ">
                <h1 className="py-4 mx-2" style={{"font-family": `'Josefin Sans', 'sans-serif'`}} >Timeline</h1>
                  <AllPosts/>
            </div>
          </div>
          </div>
       </>
    );
}

export default HomeAndUsers;