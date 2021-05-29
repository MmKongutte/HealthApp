const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const BodyData = require("../../models/BodyData");
//const io=require("../../index");

let n;

//@route GET /user/bodydata
//@desc get user data
//@access Private

router.get("/", auth, (req, res) => {
  User.findById(req.user.id).then(async (user) => {
    console.log("in bodydata get method");
    console.log(user);
    if (!user)
      return res.status(400).json({ msg: "Unauthorized access! Please Login" });
    bodyId = user.bodyId;
    const bodyData = await BodyData.findById(bodyId);
    console.log(bodyData);
    if (bodyData) {
      return res.status(200).json({ bodyData });
    }
    return res.status(404).json({ msg: "Body data not found" });
  });
});

router.post("/", auth, (req, res) => {
  const { bodyData } = req.body;
  console.log("in bodydata post method");

  User.findById(req.user.id).then((user) => {
    console.log(user);
    if (!user)
      return res.status(400).json({ msg: "Unauthorized access! Please Login" });

    const bodyId = user.bodyId;
    BodyData.updateOne({ _id: bodyId }, bodyData).then((data) => {
      if (data) {
        return res.status(200).json({ bodyData: data });
      }
      return res.status(404).json({ msg: "Internal error" });
    });
  });
});

router.post("/updateData", async (req, res) => {
  const {count} = req.body;

   n=parseInt(count);

  console.log("route called",n);
  const users = await User.find({});
  users.map((user) => {
    fetchAndUpdateUserData(user);
  });
  return res.status(200).json({ msg: "updated successfully" });
});
function randomFloat(min, max) { 
   let randomNum = Math.random() * (max - min) + min; 
   return parseFloat(randomNum.toFixed(2));
  }
function randomReal(min, max) { 
    let randomNum = Math.random() * (max - min) + min; 
    return parseInt(randomNum);
   }

function newavg(oldavg,n,newvalue){
 let avg=((oldavg*(n-1))+newvalue)/n;
 
 return(avg.toFixed(2));
}

function newavgReal(oldavg,n,newvalue){
  let avg=((oldavg*(n-1))+newvalue)/n;
  
  return parseInt(avg);
 }
 function randomFloat(min, max) { 
  let randomNum = Math.random() * (max - min) + min; 
  return parseFloat(randomNum.toFixed(2));
 }
function randomReal(min, max) { 
   let randomNum = Math.random() * (max - min) + min; 
   return parseInt(randomNum);
  }


const fetchAndUpdateUserData = (user) => {
  //make API request to get updated user data
  //using demo data for now
  
  const bodyId = user.bodyId;
  User.findById(bodyId).then(async (user) => {
    const bodyData = await BodyData.findById(bodyId)
    .then((data)=>{
    
      vartemprature= randomFloat(36.1,39);
      varglucose= randomReal(100,250);
      varheartRate= randomReal(40,140);
      varoxygen=randomReal(88,100);
      varcholestrol= randomReal(40,200);
      varsustolicbp= randomReal(90,150);
      vardiastolicbb= randomReal(60,120);
      varinsulin=randomReal(95,160);
      varrespiration=randomReal(10,30);

      varavgtemprature= newavg(data.avgtemprature,n,vartemprature);
      varavgglucose= newavgReal(data.avgglucose,n,varglucose);
      varavgheartRate= newavgReal(data.avgheartRate,n,varheartRate);
      varavgoxygen= newavgReal(data.avgoxygen,n,varoxygen);
      varavgcholestrol= newavgReal(data.avgcholestrol,n,varcholestrol);
      varavgsustolicbp= newavgReal(data.avgsustolicbp,n,varsustolicbp);
      varavgdiastolicbb= newavgReal(data.avgdiastolicbb,n,vardiastolicbb);
      varavginsulin=newavgReal(data.avginsulin,n,varinsulin);
      varavgrespiration=newavgReal(data.avgrespiration,n,varrespiration);
   
      const demoData = {
        temprature: vartemprature,
        glucose: varglucose,
        heartRate: varheartRate,
        oxygen: varoxygen,
        cholestrol: varcholestrol,
        sustolicbp: varsustolicbp,
        diastolicbb: vardiastolicbb,
        insulin:varinsulin,
        respiration:varrespiration,

        avgtemprature: varavgtemprature,
        avgglucose:varavgglucose,
        avgheartRate: varavgheartRate,
        avgoxygen: varavgoxygen,
        avgcholestrol: varavgcholestrol,
        avgsustolicbp: varavgsustolicbp,
        avgdiastolicbb: varavgdiastolicbb,
        avginsulin:varavginsulin,
        avgrespiration:varavgrespiration,

      };
      BodyData.updateOne({ _id: bodyId }, demoData).then().catch((err)=>{console.log(err)}); 
    //  io.sockets.in(user._id).emit("updated data")
     
    }).catch((err)=>{console.log(err)});
    
  }).catch((err)=>{console.log(err)});
   
    
  return;
};

module.exports = router;
