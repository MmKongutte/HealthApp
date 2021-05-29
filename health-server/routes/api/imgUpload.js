const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Uploads=require("../../models/Uploads");
router.post("/", (req, res) => {
   console.log(req.body);
    const {id, toUrl, toDescription,toReportType } = req.body;
    User.findById(id).then(async (user) => {
          
            upId=user.uploadsId;
            console.log("uploads id is=",upId);
            const summary={
                url:toUrl,
                description:toDescription,
                reportType:toReportType 
              }
             
            Uploads.updateOne({ _id: upId }, {$push:{ imgData:summary}}).then(
              console.log("added Image ")
            ).catch((err)=>{console.log("error in Image adding",err)});      

    })
})

module.exports = router;