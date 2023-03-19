const express = require('express');
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

app.get('/', (req, res) => {
     res.send('Welcome')
});
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
   



const PORT = process.env.PORT;  
app.listen(PORT, console.log(`Server started on port ${PORT}`));