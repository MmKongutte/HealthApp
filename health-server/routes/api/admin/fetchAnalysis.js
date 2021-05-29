const express = require("express");

const router = express.Router();
const Analyze = require("../../../models/Analyze");

router.post("/",  async (req, res) => {
    console.log("api hit");
    await Analyze.find({}, (err, analysis) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!analysis.length) {
            return res
                .status(404)
                .json({ success: false, error: `no analysis found ` })
        }
        console.log(analysis[0]);
        return res.status(200).json({ success: true, data: analysis[0] })
}).catch(err => console.log(err))})
 
 module.exports = router;