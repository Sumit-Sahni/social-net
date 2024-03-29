const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes');
const videoRoutes = require('./routes/videoRoutes');
const path = require('path');



dotenv.config();
connectDB();

app.use(cors({origin:true}));

app.use(express.json());
// app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(passport.initialize());

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
   
// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }


const PORT = process.env.PORT;  
app.listen(PORT, console.log(`Server started on port ${PORT}`));