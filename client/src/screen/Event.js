import { useState , useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import moment from "moment";





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
              <div className="container px-4  py-4" key={index} style={{}}>
                <div className="row">
                      <div className="col-lg-4 col-md-12 col-12 px-2 mb-5">
                           <img style={{"width":"350px"}} src={event.eventpic}/>
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
                  </div>
            )
          })
         }
        </>
    )
}

export default Event;