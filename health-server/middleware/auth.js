const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const usertoken = req.header("x-auth-token");

  //check token

  if (!usertoken) return res.status(401).json({ msg: "unauthrozised access" });

  try {
    // verify token
   // const decoded = jwt.verify(token, config.get("jwtSecret"));
   console.log(usertoken);
   const token = usertoken.split(' ');
   const decoded = jwt.verify(token[1],  config.get("jwtSecret"));

    console.log(decoded); 
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    console.log("invalid token...");
    
    res.status(400).json({ msg: "invalid token" });
  }
}

module.exports = auth;
