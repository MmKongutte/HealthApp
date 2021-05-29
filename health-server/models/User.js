const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  predictionId:{
    type: mongoose.Types.ObjectId,
    ref: "Prediction",
  },
  bodyId: {
    type: mongoose.Types.ObjectId,
    ref: "BodyData",
  },
  uploadsId:{
    type: mongoose.Types.ObjectId,
    ref: "Uploads",
  },
  name: {
    type: String,
    required: true,
    uppercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bmi:{
     type:Number,
     required:true,
  },
  yob:{
    type:Number,
    required:true,
  },
  gender:{
    type:String,
    required:true,
  },

  register_date: {
    type:Date,
    default: Date.now,
  },
  healthStatus:{
    type:Number,
    default:0
  }
});

module.exports = User = mongoose.model("user", UserSchema);
