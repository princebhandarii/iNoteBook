const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook";

const connectTOMongo=()=>{
  mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code after successfully connecting
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    // Handle the error
  });
}
module.exports=connectTOMongo;