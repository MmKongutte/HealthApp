const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//user model
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const BodyData = require("../../models/BodyData");
const Prediction=require("../../models/Prediction");
const Uploads= require("../../models/Uploads");
//@route POST /user/register
//@desc Regiser new user
//@ access Public
router.post("/", (req, res) => {
  console.log(req.body);
  const { name, email,phone, password ,bmi,yob,gender} = req.body;

  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then(async (user) => {
    if (user) return res.status(400).json({ msg: "Already registered" });
    const bodyData = await BodyData().save();
    const bodyId = bodyData._id;
    const predictHealth=await Prediction().save();
    const  predictionId=predictHealth._id;
    const uploads=await Uploads().save();
    const  uploadsId=uploads._id;
    const newUser = new User({
      name,
      email,
      phone,
      password,
      bmi,
      yob,
      gender,
      bodyId,
      predictionId,
      uploadsId

    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
