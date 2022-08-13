const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Video = require("../models/videoModel");


    const createVideos = asyncHandler(async (req, res) => {
       
         const {title} = req.body;
         let videoPaths =[];
        
         if(Array.isArray(req.files) && req.files.length > 0){
                req.files.forEach(video => {
                    videoPaths.push("/" + video.path);
                });
         }

           try{
            const newVideo = await Video.create({
                title,
                videos: videoPaths,

            })
            res.status(200).json({
                newVideo
            })

           }catch(err){
                res.status(400).json({
                     message: "Error creating video",
                     error: err
                })
           }
           


         
    })
module.exports = createVideos;