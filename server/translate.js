const axios = require('axios');


const flight = (flightnumber, date, callback) => {
  axios.get(`http://localhost:3030/flight?flightNumber=` + flightnumber + `&date=%22` + date + `%22`, {
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