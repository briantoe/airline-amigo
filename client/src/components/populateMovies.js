const axios = require('axios');


const populateMovies = (callback) => {
  axios.get(`http://10.204.106.148:8080/movies`)
  .then(res => {
    console.log(res.data);
    callback(res.data)
  })
  .catch(err =>{
    console.log(err.response);
    callback(null, err)
  });
}

module.exports = {populateMovies};