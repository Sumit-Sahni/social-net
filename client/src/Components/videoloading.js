import React from "react";
import styled from "styled-components";
import "../screen/styled/CSS/loading.css"

const DisplayVideo = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column!important;
  }
`
const VideoLoading = () => {
 

    return(
        <div>
            <DisplayVideo className="col-lg-12  d-flex flex-row gap-2 ">
              <div>
                <h5>Your Video is being Loading... </h5>
              </div>
              <div className="lds-ring mx-2 "><div></div><div></div><div></div><div></div></div>
           </DisplayVideo>
        </div>
    
    )
}

export default VideoLoading;