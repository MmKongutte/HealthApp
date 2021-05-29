const { default: axios } = require("axios");

const callApiToUpdate = (n) => {
  
  axios
    .post("http://localhost:4000/user/bodydata/updateData",{'count':n})
    .then((rep) => console.log(rep.data))
    .catch((err) => console.log(err));
};

module.exports = callApiToUpdate;
