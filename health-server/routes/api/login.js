const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//@route POST /user/login
//@desc Regiser new user
//@access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
 console.log(req.body);
  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "Please register" });

    //validate
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

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
              instituteId: user.instituteId,
              isApprovedByInstitute: user.isApprovedByInstitute,
            },
          });
        }
      );
    });
  });
});

//@route GET /user/login/auth
//@desc get user data
//@access Private

router.get("/auth", auth, (req, res) => {
  User.findById(req.user.id).select("-password");
});

router.get("/verify", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));

  console.log("hi");
});

module.exports = router;
