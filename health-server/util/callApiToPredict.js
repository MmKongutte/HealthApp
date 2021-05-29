const { default: axios } = require("axios");
const callApiToPredict = () => {
//changes
    
  axios
    .post("http://localhost:4000/user/predictHealth/predictData")
    .then((rep) => console.log(rep.data))
    .catch((err) => console.log(err));
};

module.exports = callApiToPredict;
