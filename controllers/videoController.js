const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Video = require("../models/videoModel");
const User = require("../models/userModel");


    const createVideos = asyncHandler(async (req, res) => {
       
        const {id}  = req.params;
        const newVideo = new Video(req.body);
        const user = await User.findById(id);
    
        newVideo.user = user;
        await newVideo.save();
    
        user.videos.push(newVideo);
        await user.save();
        res.status(201).json(newVideo);

         
    })
module.exports = createVideos;