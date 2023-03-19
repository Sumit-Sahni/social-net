const asyncHandler = require("express-async-handler");
const Event = require('../models/EventModel');



const createEvent = asyncHandler(async(req,res)=>{
   const { eventTitle,  eventDescription, eventpic,  eventDate } = req.body;
   
   const event = await Event.create({
    eventtitle : eventTitle,
    eventdescription : eventDescription,
    eventpic : eventpic,
    eventdate : eventDate,
   })
    res.status(201).json(event);
});

  const getAllEvents = asyncHandler(async(req,res)=>{
    const events = await Event.find();
    res.status(200).json(events);
  })

  const deleteEvent = asyncHandler(async(req,res)=>{
    const event = await Event.findById(req.params.id);
    if(!event){
      return res.status(404).json({msg:"Event not found"});
    }
    await event.remove();
    res.status(200).json({msg:"Event deleted successfully"});
  })
  
module.exports = {createEvent, getAllEvents, deleteEvent};