const mongoose = require('mongoose');



const videoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    videos:[{
        type: String,
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true 
    },
    created_at : {
        type: Date, required: true, default: Date.now
    }
})

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;