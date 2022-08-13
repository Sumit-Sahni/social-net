const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const notes = require('./data/node.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes');
const videoRoutes = require('./routes/videoRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');




dotenv.config();
connectDB();

app.use(cors(

));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(passport.initialize());
app.get('/notes/:id', (req, res) => {
     const note  = notes.map(function(users){
       return users;
     })
     res.send(note);
});
// app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/api/users',userRoutes);
app.use('/allusers',userRoutes);
app.use('/api/users/:id',userRoutes);
app.use('/api/users/:id', userRoutes);
app.use('/api', userRoutes);

// Post Route

app.use('/api/posts', postRoutes);

// Event Route
app.use('/api/events', eventRoutes);

// Video Route
const storage = multer.diskStorage({
    destination: (req, file,cb)=>{
       if(!fs.existsSync('public')){
             fs.mkdirSync('public');
       }
       if(!fs.existsSync('public/videos')){
          fs.mkdirSync('public/videos');
    }
         cb(null, 'public/videos');
    },
     filename: (req, file, cb)=>{
         cb(null, Date.now() + file.originalname);
     },
  });
  
  
  const upload = multer({
     storage: storage,
     fileFilter: (req, file, cb)=>{
         const ext = path.extname(file.originalname);
           if(ext !== '.mp4' && ext !== '.mkv'){
                return cb(res.status(400).end('only mp4 and mkv are allowed'));
           }
         cb(null, true);
     }
  });





app.use('/api/videos', upload.fields([
    { name: 'videos', maxCount: 5 },
]),  videoRoutes);



// _________________________________Deployment to Heroku________________________________________
   
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, 'client/build')));
        
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client/build/index.html'));
        });
    }else{
        app.get("/",(req,res)=>{
          res.send("APi is running")
        } )
    }


const PORT = process.env.PORT;  
app.listen(PORT, console.log(`Server started on port ${PORT}`));