const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const BodyData = require("../../models/BodyData");
const Analyze = require("../../models/Analyze");
const nodemailer = require("nodemailer");


const { default: axios } = require("axios");
var analysis = [0, 0, 0, 0, 0, 0];

let transport = nodemailer.createTransport({
  service: "Gmail",
  port: 4000,
  auth: {
    user: "your email id",
    pass: "your password",
  },
});

router.post("/predictData", async (req, res) => {
  //fetch all users

  const users = await User.find({});

  users.map((user) => {
    savePredictions(user);
  });

  setTimeout(() => {
    setNewAnalysis();
  }, 1000);
  return res.status(200).json({ msg: "saved successfully" });
});

function setNewAnalysis() {
  const newAnalysis = {
    diabetesCount: analysis[0],
    preDiabetesCount: analysis[1],
    hypoximeaCount: analysis[2],
    asthamaCount: analysis[3],
    bronchiCount: analysis[4],
    chdCount: analysis[5],
  };

  Analyze.updateOne({ id: 1 }, newAnalysis, { upsert: true })
    .then(() => {
      console.log("analysis updated...");
    })
    .catch(() => {
      console.log("error in analysis update");
    });

  analysis = [0, 0, 0, 0, 0, 0];
}

const savePredictions = (user) => {
  var subdi = "hiiiii";

  //getting user data

  const bodyId = user.bodyId;
  const predictionId = user.predictionId;
  const userbmi = user.bmi;
  const usergender = user.gender;
  const useryob = user.yob;
  const useremail = user.email;
  const userId = user._id;
  const username=user.name;

  //getting body data

  User.findById(bodyId)
    .then(async (user) => {
      const bodyData = await BodyData.findById(bodyId)
        .then((data) => {
          useravgtemprature = data.avgtemprature;
          useravgglucose = data.avgglucose;
          useravgheartRate = data.avgheartRate;
          useravgoxygen = data.avgoxygen;
          useravgcholestrol = data.avgcholestrol;
          useravgsustolicbp = data.avgsustolicbp;
          useravgdiastolicbb = data.avgdiastolicbb;
          useravginsulin =data.avginsulin;
          useravgrespiration= data.useravgrespiration;

          const avgdata = {
            useravgtemprature: data.avgtemprature,
            useravgglucose: data.avgglucose,
            useravgheartRate: data.avgheartRate,
            useravgoxygen: data.avgoxygen,
            useravgcholestrol: data.avgcholestrol,
            useravgsustolicbp: data.avgsustolicbp,
            useravgdiastolicbb: data.avgdiastolicbb,
            useravginsulin :data.avginsulin,
            useravgrespiration: data.avgrespiration,
            usersbmi: userbmi,
            usersyob: useryob,
            userpid: predictionId,
            usergender:usergender,
          };
          //console.log("beeee",avgdata);
          axios
            .post("http://localhost:4000/user/pyPrediction/toPython", avgdata)
            .then((rep) => {
              // console.log("yehhh",rep.data);
              const status = rep.data;
              console.log("status=", status);
              changeHealthStatus(status, userId);

              if (status[0] == 1) {
                maindi=`You are at Risk for Diabetes`;
                subdi = `Considering your health paramters ,today your average glucose level was `+  useravgglucose +` ,insulin level was 145. We suggest you should follow healthy practise such as low sugar intake,  low alcohol consumption and daily exercise.`;
              } else {
                maindi=`You are not at Risk for Diabetes`;
                subdi = `Today your average glucose level was `+  useravgglucose +`. `; 
              }
              if (status[1] == 1) {
                mainpredi=`You are at Risk for Prediabetes`;
                subpredi = `which indicates your blood sugar level is high`;
              } else {
                mainpredi=``;
                subpredi = ``;
              }
              if (status[2] == 1) {
               mainhypo='You are  at Risk for Hypoxemia';
               subhypo='Today your average oxygen saturation level was'+useravgoxygen+' which indicates low level of oxygen in blood.';
              } else {
               mainhypo='';
               subhypo='';
              }
              if (status[3] == 1) {
                mainast='You are at  Risk for asthama';
                subast='';
              } else {
                mainast='';
                subast='';
              }
              if (status[4] == 1) {
                mainbronchi = ``;
                subbronchi = ``;
                
              } else {
                mainbronchi = ``;
                subbronchi = ``;
              }
              if (status[5] == 1) {
                mainchd = `You are at  Risk for CHD`;
                subchd = ``;
              } else {
                mainchd = ``;
                subchd = ``;
              }
           
              //sending mail with daily reports

              var message = {
                from: "your email id",
                to: useremail,
                subject: "Today's Health Reports",
                // text: `your report ${subdi}`,
                html:`<div>
                <p>Hello <b>${username}</b> ,have a look at today's reports!</p>
                <br/>
                <b>${maindi}</b>
                <p>${subdi}</p>
                <br/>
                <b>${mainhypo}</b>
                <p>${subhypo}</p>
                <br/>
                <b>${mainast}</b>
                <p>${subast}</p>


                
                </div>
                `,
              };
              transport.sendMail(message, function (err, info) {
                console.log("sending email..");
                if (err) {
                  console.log(err);
                } else {
                  console.log("email sent successfully");
                }
              });
            })
            .catch((err) => console.log(err));

         
          //setting all average values to 0
          const demoData = {
            avgtemprature: 0,
            avgglucose: 0,
            avgheartRate: 0,
            avgoxygen: 0,
            avgcholestrol: 0,
            avgsustolicbp: 0,
            avgdiastolicbb: 0,
            avginsulin:0,
            avgrespiration:0,
          };
          BodyData.updateOne({ _id: bodyId }, demoData)
            .then()
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  return;
};

function changeHealthStatus(status, userId) {
  var count = 0;
  let healthStat;
  for (var i = 0; i < status.length; ++i) {
    if (status[i] == 1) {
      count++;
      analysis[i] += 1;
    }
  }

  if (count >= 4) {
    healthStat = 2;
  }
  if ((count == 2) | (count == 3)) {
    healthStat = 1;
  }
  if ((count == 0) | (count == 1)) {
    healthStat = 0;
  }

  User.updateOne({ _id: userId }, { $set: { healthStatus: healthStat } })
    .then(() => {
      console.log("status updated");
    })
    .catch(() => {
      console.log("error in status update");
    });
}

module.exports = router;
