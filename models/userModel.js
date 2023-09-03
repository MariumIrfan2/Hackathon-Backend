const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  
  profilePic: {
    type: String,
   
  },
  DOB: {
    type: String,
    
  },
  gender: {
    type: String,
  
  },
  location: {
    type: String,
   
  },
  bio: {
    type: String,
   
  },
});

module.exports = mongoose.model("users", userSchema);
