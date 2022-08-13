const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");
const Post = require("../models/postModel");
const { fetchAllPosts } = require("./postController");





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

  
 const adminAuth = asyncHandler(async(req,res)=>{

  const {email, password} = req.body;
  const user = await User.findOne({ email });

   if(user.isAdmin === true){
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
   }
   else{
    res.status(400);
    throw new Error("Invalid User");
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
   
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if (!user.followers.includes(req.body.userId)) {
             await user.updateOne({$push:{followers: req.body.userId}})
             await currentUser.updateOne({$push:{followings: req.params.id}})
             return res.status(201).json("User has been followed");
         } else {
          return req.status(401).json("Alreay following");
         } 
      } catch (error) {
          return res.status(500).json(error)
      }
 })


  const unfollowUser = asyncHandler(async(req,res)=>{
          try{
             const user = await User.findById(req.params.id);
              const currentUser = await User.findById(req.body.userId);
             if(user.followers.includes(req.body.userId)){
                 await user.updateOne({$pull:{followers: req.body.userId}})
                  await currentUser.updateOne({$pull:{followings: req.params.id}})
                 return res.status(201).json("User has been unfollowed");
             }
          }
          catch(err){
              console.log(err)
          }  
  })


   const deleteUser = asyncHandler(async(req,res)=>{
      
      const user = await User.findById(req.params.id);

        console.log(user.posts)
        console.log(user.posts.length)
          for(let i=0;i<user.posts.length;i++){
            console.log("in for loop")
            const post = await Post.findById(user.posts[i]);
            console.log("after finding post")
            console.log(post)
            if(post!=null){
              console.log("deleting post")
              await post.remove();
            }
                 
        }
     
      if(user){
          await user.remove();
          return res.status(200).json("User has been deleted");
      }
      else{
          return res.status(404).json("User not found");
      }
   })

    const  userByFollowers = asyncHandler(async(req,res)=>{
          const user = await User.find({
             "_id": {$in:[ObjectId(req.params.id)]}
          })
          res.send({user});
    })
    
module.exports = {
    registerUser,
     authUser,
     getUser, 
     getUserById,
     updateUser,
     followUser,
     unfollowUser,
     adminAuth,
     deleteUser,
     userByFollowers,
      
 };