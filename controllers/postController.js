 const express = require('express');
 const mongoose = require('mongoose');
 const asyncHandler = require("express-async-handler");
 const User = require('../models/userModel');
 const Post = require('../models/postModel');




  // Make Post By UserId
  const makePostByUser = asyncHandler(async(req,res)=>{
    const {id}  = req.params;
    const newPost = new Post(req.body);
    const user = await User.findById(id);

    newPost.user = user;
    await newPost.save();

    user.posts.push(newPost);
    await user.save();
    res.status(201).json(newPost);
  })
 
// get all posts

const fetchAllPosts = asyncHandler(async(req,res)=>{
  const posts = await Post.find().populate('user');
  res.status(200).json(posts);
})
//update a post*********************************************************
const updateById = asyncHandler(async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("the post has been updated");
        } else {
          res.status(403).json("you can update only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    
})

// //like / dislike a post
 const updateLikes = asyncHandler(async(req,res)=>{
    try {
        const post  = await Post.findById(req.params.id);
       if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}})
            return res.status(201).json("Post Liked")
       }else{
        await post.updateOne({$pull:{likes: req.body.userId}})
        return res.status(201).json("Post DisLiked")
       }
     } catch (error) {
     return  res.status(500).json(err);
     }
})


//  get a post by id

const getById = asyncHandler(async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
})


// get all posts
 const getEverythings = asyncHandler(async(req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userid);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
             Post.find({ userId: friendId });
          })
        );
       res.status(200).json(userPosts.concat(...friendPosts))
      } catch (err) {
        res.status(500).json(err);
      }
 })


module.exports = { updateById, updateLikes, getById, getEverythings,makePostByUser,fetchAllPosts};