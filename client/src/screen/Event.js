import { useState , useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import moment from "moment";
import styled from "styled-components";


const StyleEvent = styled.div`
    //   border: 1px solid black;
         padding:1rem;
         width: auto;
         &:hover{
         box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px!important;
         background: rgba(0,0,0,0.2);
         pointer-events: cursor;
         
          }
          border-radius:15px;
          transition: all 0.4s ease-in-out;
          
`



const Event = () => {

  const auth = localStorage.getItem("userInfo");

  const [events, setEvents] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
          const data = await axios.get(`/api/events/`)
          console.log(data.data);
          setEvents(data.data);
        }
        fetchData();
  },[])

    const  deleteEventHandler = async (id) => {
        await axios.delete(`/api/events/${id}`);
        window.location.reload();
    }

    return (
        <>
          <nav className="navbar navbar-expand-lg bg-dark p-4 ">
  <div className="container-fluid">
  <NavLink to={`/welcome`} className="nav-link text-white">Home</NavLink>
    <button className="navbar-toggler border " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul  className="navbar-nav me-auto  mb-lg-0">
      </ul>
    </div>
   </div>

      </nav>

         {
          events.map((event, index) => {
            return (
              <div className="container   py-4" key={index} style={{}}>
                <StyleEvent>
                <div className="row">
             
                      <div className="col-lg-4 col-md-12 col-12  mb-5">
                           <img style={{"width":"280px"}} src={event.eventpic}/>
                      </div>
                      <div className="col-lg-8 col-md-12 col-12 p-5">
                          <h1 style={{"font-family": `'Josefin Sans', 'sans-serif'`}}>{event.eventtitle}</h1>
                          <p>{event.eventdescription}</p>
                          <p>Organise On:- {moment(event.eventdate).format("MMMM Do YYYY")}</p>
                          {
                            JSON.parse(auth).isAdmin && <button  type="button" onClick={()=> deleteEventHandler(event._id)} className="btn btn-danger mx-2">Delete Event</button>
                          }
                      </div>
                    </div>
                    </StyleEvent>
                  </div>
            )
          })
         }
        </>
    )
}

export default Event;