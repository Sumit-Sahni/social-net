const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const postShema = new Schema({
    title: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
      },
      user:{
           type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true 
      },
    created_at : {
        type: Date, required: true, default: Date.now 
       },
},
 
);

const Post = mongoose.model('Post', postShema);
module.exports = Post;