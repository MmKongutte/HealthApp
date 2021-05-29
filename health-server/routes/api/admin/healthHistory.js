const express = require("express");
const router = express.Router();
const Prediction= require("../../../models/Prediction");
router.post("/", (req, res) => {
   
    const  id  = req.body.predictionId;
   
    Prediction.findById(id).then((data) => {
      let n=data.healtData.length;
      res.json(data.healtData[n-1]);
    })
})
 
 module.exports = router;