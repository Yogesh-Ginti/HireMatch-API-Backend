import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:'jobseeker'
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',  // Reference to the Bookmark model
  }]

},{timestamps:true})

const userModel = mongoose.model('User', userSchema)
export default userModel;
