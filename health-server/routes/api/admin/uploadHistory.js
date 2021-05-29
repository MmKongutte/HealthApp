const express = require("express");
const router = express.Router();
const User = require("../../../models/User");
const Uploads= require("../../../models/Uploads");
router.post("/", (req, res) => {
  
    const  id  = req.body.uploadsId;
    Uploads.findById(id).then(async (images) => {
       
        
        res.status(200).json({ success: true, data: images.imgData })
            
    })
    
  
 })
 
 module.exports = router;