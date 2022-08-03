const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const eventShema = new Schema({
    eventtitle: {
        type: String,
        required: true,
    },
    eventpic: {
        type: String,
        required: true,
        default:
         "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  
    eventdescription: {
        type: String,
    },
    eventdate:{
        type: Date,
 
    },
    created_at : {
        type: Date, required: true, default: Date.now 
       },
},
 
);

const Event = mongoose.model('Event', eventShema);
module.exports = Event;