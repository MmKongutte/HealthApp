const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-url');

// Create Schema
const ImgDetails = new Schema({
  url: {
    type: mongoose.SchemaTypes.Url,
    required:true
  },
  description: {
    type: String,
    default: '',
  },
  reportType: {
    type: String,
    required:true
  },
   date: {
    type: Date,
    default: Date.now,
  },

});


const UploadsSchema= new mongoose.Schema({
 
  imgData: [ ImgDetails]
  

});

module.exports = Uploads = mongoose.model("Uploads",  UploadsSchema);
