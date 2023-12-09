const mongoose = require('mongoose');
const dotenv =require('dotenv').config();


 const mongoURI="mongodb+srv://princebhandari:princebhandari@cluster0.9fhjmbn.mongodb.net/inotebook?retryWrites=true&w=majority";
//const mongoURI="mongodb://localhost:27017/"
//const mongoURI = process.env.MONGODB_URI;
console.log('MongoDB URI:', mongoURI);

const connectTOMongo = () => {
  if (!mongoURI) {
    console.error('MongoDB URI is undefined');
    return;
  }

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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