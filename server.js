const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const notes = require('./data/node.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes');
const videoRoutes = require('./routes/videoRoutes');
const multer = require('multer');
const path = require('path');
// const fs = require('fs');




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
app.use('/api/videos', videoRoutes);


// _________________________________Deployment to Cyclic________________________________________
   
   
     
    app.get('**', (req, res) => {
          res.sendFile(path.join(__dirname, 'client/build/index.html')),
          function(err){
             res.status(500).send(err);
          }});
     

const PORT = process.env.PORT;  
app.listen(PORT, console.log(`Server started on port ${PORT}`));