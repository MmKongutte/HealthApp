const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema to store current health parameters and average health parameters
const BodyDataSchema = new Schema({
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
  insulin:{
    type:Number,
    default: 0,
  },
  respiration:{
    type:Number,
    default:0,
  },
  avgtemprature: {
    type: Number,
    default: 0,
  },
  avgglucose: {
    type: Number,
    default: 0,
  },
  avgheartRate: {
    type: Number,
    default: 0,
  },
  avgoxygen: {
    type: Number,
    default: 0,
  },
  avgcholestrol: {
    type: Number,
    default: 0,
  },
  avgsustolicbp: {
    type: Number,
    default: 0,
  },
  avgdiastolicbb: {
    type: Number,
    default: 0,
  },
  avginsulin:{
    type:Number,
    default: 0,
  },
  avgrespiration:{
    type:Number,
    default:0,
  },
});

module.exports = BodyData = mongoose.model("BodyData", BodyDataSchema);
