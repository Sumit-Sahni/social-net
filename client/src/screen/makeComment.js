import react from 'react';
import axios from "axios";
import {useState} from "react";




const MakeComment = ({id}) => {
       const  auth = localStorage.getItem("userInfo");
         const [content, setContent] = useState("");

   const submitHandler =  async(e) => {
        e.preventDefault();
    const data = {
        content,
       
    }
    await axios.post(`/api/comment/makecomment/${id}`,data);
    console.log(data);
    setContent("");
   }


    return (
        <div>
        
         <form onSubmit={submitHandler}>
          <input type="text" placeholder="Comment"
           value={content}
            onChange={(e) => setContent(e.target.value)}

          />
          <button type="submit" className='mx-2'>Comment</button>
        </form>
                                    
        </div>
    );
}

export default MakeComment;