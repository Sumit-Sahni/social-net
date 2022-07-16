import styled from "styled-components";

export const PortfolioImage = styled.div`
   
   .figure-img{
       width: 100vh;
       border-radius: 6%!important;
   }
   
`
export const AnimationOnbutton = styled.div`
        
  animation: bounce 1.8s infinite alternate;
   @keyframes bounce {
    0% {
        transform: translateY(0px);
        
    }
    100% {
        transform: translateY(15px);
        
    }
   }
`