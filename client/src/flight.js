const axios = require('axios');


const flight = (callback) => {
  axios.get(`http://localhost:3030/currentFlight`, {
  }).then(res => {
    console.log(res.data);
    callback(res.data)
  })
  .catch(err =>{
    console.log(err.response.data);
    callback(null, err)
  });
}

module.exports = {flight};