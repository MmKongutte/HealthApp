const express = require("express");

const router = express.Router();
const User = require("../../../models/User");


router.post("/",  async (req, res) => {
   
  
   User.count({ healthStatus: 2 }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
       
        res.json(result);
    }
   });

  
    
})
 
 module.exports = router;