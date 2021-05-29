const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const HealthSchema = new Schema({
  temprature: {
    type: Number,
    default: 0,
  },
  glucose: {
    type: Number,
    default: 0,
  },
  heartRate: {
    type: Number,
    default: 0,
  },
  oxygen: {
    type: Number,
    default: 0,
  },
  cholestrol: {
    type: Number,
    default: 0,
  },
  sustolicbp: {
    type: Number,
    default: 0,
  },
  diastolicbb: {
    type: Number,
    default: 0,
  },
  insulin: {
    type: Number,
    default: 0,
  },
  respiration: {
    type: Number,
    default: 0,
  },
  isDiabetes:{
    type:Boolean,
    default:0,
  },
  isPreDiabetes:{
    type:Boolean,
    default:0,
  },
  isBronchiectasis:{
    type:Boolean,
    default:0,
  },
  isChd:{
    type:Boolean,
    default:0,
  },
  isHypoxemia:{
    type:Boolean,
    default:0,
  },
  isAsthma:{
    type:Boolean,
    default:0,
  },
  date: {
    type:Date,
    default: Date.now,
  },

});


const PredictionSchema= new mongoose.Schema({
 
  healtData: [HealthSchema]
  

});

module.exports = Prediction = mongoose.model("Prediction",  PredictionSchema);
