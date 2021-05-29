const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const app = express();
const http = require("http");
const callApiToUpdate = require("./util/callApiToUpdate");
const callApiToPredict = require("./util/callApiToPredict");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);
let n=1;
let apiUpdateInterval=null;

app.use(express.json());
app.use(cors());



// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  // Adding new mongo url parser
  .then(() => {
    console.log("MongoDB Connected...");
    
   })
  .catch((err) => console.log(err));

//use routes
app.use("/user/register", require("./routes/api/register"));
app.use("/user/login", require("./routes/api/login"));
app.use("/user/healthHistory",require("./routes/api/admin/healthHistory"));
app.use("/user/fetchAnalysis",require("./routes/api/admin/fetchAnalysis"));
app.use("/user/userAnalysis",require("./routes/api/admin/userAnalysis"));
app.use("/user/fetchRiskCount",require("./routes/api/admin/fetchRiskCount"));


app.use("/user/fetchUsers",require("./routes/api/admin/fetchUsers"));
app.use("/user/uploadHistory",require("./routes/api/admin/uploadHistory"));
app.use("/user/fetchHealth",require("./routes/api/fetchHealth"));
app.use("/user/fetchReports", require("./routes/api/fetchReports"));
app.use("/user/bodydata", require("./routes/api/bodydata"));
app.use("/user/predictHealth", require("./routes/api/predictHealth"));
app.use("/user/imgUpload",require("./routes/api/imgUpload"));
app.use("/user/pyPrediction",require("./routes/api/pyPrediction"));


io.on("connection", function (socket) {
  
  console.log("user joined");

});







// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server started on port ${port}`));




setInterval(function () {
  clearInterval(apiUpdateInterval);
  callApiToPredict();
   io.sockets.emit("broadcast", { code: 2, log: "predicted" });
   n=1;
  apiUpdator();
}, 60000);





//call update every 30 sec
function apiUpdator()
{
apiUpdateInterval= setInterval(function () {
  callApiToUpdate(n);
  n=parseInt(n)+1;
  io.sockets.emit("upbroadcast", { code: 1, log: "updated" });
}, 20000);
}

apiUpdator();