const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");





  const registerUser = asyncHandler(async(req,res)=>{
   const {name,email,password,pic,describe,date, gender,college , about} = req.body;

   const userExist = await User.findOne({email});

   if(userExist){
         return res.status(400).json({
              msg: "User already exist"
         })
   }
 
    const user = await User.create({
        name,
        email,
        password,
        pic,
        describe,
        date,
        gender,
        college,
        about,
    });
  
     if(user){
          res.status(201).json({
              _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                describe: user.describe,
                data: user.date,
                gender:user.gender,
                college:user.college,
                about:user.about,
                token: generateToken(user._id),
          });
     }else{
         res.status(400);
         throw new Error("Error Occured");
     }
});


const authUser = asyncHandler(async(req,res)=>{

     const {email, password} = req.body;

     const user = await User.findOne({ email });
  
     if( user && (await user.matchPassword(password))){
         res.json({
             _id: user._id,
             name:user.name,
             email:user.email,
             isAdmin:user.isAdmin,
             pic:user.pic,
             token: generateToken(user._id),
         });
    }
     else{
        res.status(400);
        throw new Error("Invalid");
     }
 });

  const getUser = asyncHandler(async(req,res)=>{
        const data  = await User.find();
        res.send({data});

  })
  
 
  const getUserById = asyncHandler(async(req,res)=>{
    try {
      const users = await User.findById(req.params.id).populate("posts");
       return res.status(200).json(users);
  } catch (error) {
     return res.status(500).json(error);
  }
  })

  const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    if(user){
     user.phone = req.body.phone || user.phone;
     user.gender = req.body.gender || user.gender;
     user.date = req.body.date || user.date;
     user.about = req.body.about || user.about;
     user.college = req.body.college || user.college;
    }
    const updateItem = await user.save();
      res.json({
        phone: updateItem.phone,
      });
  })
   

   
//  *****************************************FOLLOW/UNFOLLOW*******************************************************
  const followUser = asyncHandler(async(req,res)=>{
    if(req.body.userId !== req.params.id ){
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if (!user.followers.includes(req.body.userId)) {
             await user.updateOne({$push:{followers: req.body.userId}})
             await currentUser.updateOne({$push:{followings: req.body.userId}})
             return res.status(201).json("User has been followed");
         } else {
          return req.status(401).json("Alreay following");
         } 
      } catch (error) {
          return req.status(500).json(error)
      }
 }
 else{
    console.log("You cant Follow Yourself")
 }
  })


  const unfollowUser = asyncHandler(async(req,res)=>{
    if(req.body.userId !== req.params.id ){
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if (user.followers.includes(req.body.userId)) {
             await user.updateOne({$pull:{followers: req.body.userId}})
             await currentUser.updateOne({$pull:{followings: req.body.userId}})
             return res.status(200).json("User has been Unfollowed");
         } else {
          return req.status(401).json("Not Following");
         } 
      } catch (error) {
          return req.status(500).json(error)
      }
 }
 else{
    console.log("You cant Follow Yourself")
 }
  })

module.exports = {
    registerUser,
     authUser,
     getUser, 
     getUserById,
     updateUser,
     followUser,
     unfollowUser    
 };