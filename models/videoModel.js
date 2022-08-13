const mongoose = require('mongoose');



const videoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    videos:[{
        type: String,
    }],
    created_at : {
        type: Date, required: true, default: Date.now
    }
})

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;