const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
           
      });
        console.log(`mongoDb Connected: ${conn.connection.host}`);
    } 
    catch (err) {
        console.error(err.message);
        process.exit();
    }
};

module.exports = connectDB;