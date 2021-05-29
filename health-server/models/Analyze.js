const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnalyzeSchema = new Schema({
  id:{
      type:Number,
      default:1,

  },

  diabetesCount:{
    type: Number,
    default:0
  },
  preDiabetesCount: {
    type: Number,
    default:0
  },
  hypoximeaCount: {
    type: Number,
    default:0
  },
  asthamaCount: {
    type: Number,
    default:0
  },
  bronchiCount: {
    type: Number,
    default:0
  },
  chdCount: {
    type: Number,
    default:0
  },
  
});

module.exports = Analyze = mongoose.model("Analyze", AnalyzeSchema);
