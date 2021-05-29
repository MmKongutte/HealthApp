const express = require("express");

const router = express.Router();
const User = require("../../../models/User");


router.post("/",  async (req, res) => {
   
    console.log("api hit");
    User.count( {}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
           
            res.json(result)
        }

   })
  

  
    
})
 
 module.exports = router;