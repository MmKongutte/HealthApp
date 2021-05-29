const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Prediction= require("../../models/Prediction");
router.post("/", (req, res) => {
   // console.log("in report api");
    User.findById(req.body.id).then((user) => {
        pid=user.predictionId;
   
        User.findById(pid).then(async(user) => {
            const bodyData = await Prediction.findById(pid)
            .then((rdata)=>{

                let n=rdata.healtData.length;
                data= rdata.healtData[n-1];
               
                const reportData = {
                    isDiabetes : data.isDiabetes,
                    isPreDiabetes: data.isPreDiabetes,
                    isBronchiectasis:data.isBronchiectasis,
                    isChd:data.isChd,
                    isHypoxemia :data.isHypoxemia,
                    isAsthma:data.isAsthma
                   
                  };
                 // console.log("reports",reportData);
                res.json(reportData);
            })
        })
            
    })
    
  
 })
 
 module.exports = router;