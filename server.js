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
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');

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

app.use('/api/users',userRoutes);
app.use('/allusers',userRoutes);
app.use('/api/users/:id',userRoutes);
app.use('/api/users/:id', userRoutes);
app.use('/api', userRoutes);

// Post Route

app.use('/api/posts', postRoutes);

// Event Route
app.use('/api/events', eventRoutes);





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