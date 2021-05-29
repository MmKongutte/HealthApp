const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const BodyData= require("../../models/BodyData");
router.post("/", (req, res) => {
  
    User.findById(req.body.id).then((user) => {
        console.log("in health api");
        bodyId=user.bodyId;
   
        User.findById(bodyId).then(async(user) => {
            const bodyData = await BodyData.findById(bodyId)
            .then((data)=>{
                const healthData = {
                    temprature: data.temprature,
                    glucose: data.glucose,
                    heartRate: data.heartRate,
                    oxygen: data.oxygen,
                    cholestrol: data.cholestrol,
                    sustolicbp: data.sustolicbp,
                    diastolicbb: data.diastolicbb,
                   
                  };
                res.json(healthData);
            })
        })
            
    })
    
  
 })
 
 module.exports = router;