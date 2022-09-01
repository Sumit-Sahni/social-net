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

const videoDelete = asyncHandler(async (req, res)=>{
  try {
    const video = await Video.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    console.log(video)
    if(video){
      await video.remove();
      await user.updateOne({$pull:{videos: req.params.id}})
      return res.status(200).json("video has been deleted");
    }
  } catch (error) {
      return req.status(500).json(error);
  }
  })


const vidFindById = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const video =  await Video.findById(id);
    res.status(201).json(video);

})  
module.exports = {createVideos, videoDelete, vidFindById};