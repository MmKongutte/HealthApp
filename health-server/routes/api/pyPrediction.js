
const express = require("express");
const router = express.Router();
const path = require('path');
const User = require("../../models/User");
const Prediction = require("../../models/Prediction");
router.post("/toPython", async (req, res) => {
   var stat=[];
  // console.log("test", req.body.useravgrespiration, req.body.useravginsulin);
    var spawnSync = require("child_process").spawnSync; 
    var process = spawnSync('python',[ path.join(__dirname, '../../python/script.py'), 
    req.body.useravgglucose,  req.body.useravginsulin  , req.body.usersbmi , req.body.usersyob ,req.body.useravgcholestrol,
    req.body.useravgsustolicbp, req.body.useravgdiastolicbb, req.body.useravgdiastolicbb,req.body.useravgoxygen, 
    req.body.useravgrespiration,req.body.usergender], { encoding : 'utf8' }); 
    statu=process.stdout;
   
    var z = statu.slice(2,-3);
    var stat = z.split(',').map(Number);
   
    
    const summy = {
        temprature: req.body.useravgtemprature,
        glucose: req.body.useravgglucose,
        heartRate: req.body.useravgheartRate,
        oxygen: req.body.useravgoxygen,
        cholestrol: req.body.useravgcholestrol,
        sustolicbp: req.body.useravgsustolicbp,
        diastolicbb: req.body.useravgdiastolicbb,
        insulin:req.body.useravginsulin,
        respiration: req.body.useravgrespiration,
        isDiabetes: stat[0],
        isPreDiabetes: stat[1],
        isBronchiectasis: stat[4],
        isChd: stat[5],
        isHypoxemia: stat[2],
        isAsthma: stat[3],
        
      };
     
      const predictionId=req.body.userpid;
      User.findById(predictionId)
      .then(async (user) => {
        const predictionData = await Prediction.findById(predictionId)
          .then((data) => {
          
            Prediction.updateOne(
              { _id: predictionId },
              { $push: { healtData: summy } }
            )
              .then(console.log("added to Prediction "))
              .catch((err) => {
                console.log("error in prediction adding", err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
      

    res.send(process.stdout);

});
module.exports = router;