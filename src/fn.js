const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const fn = {
  add: function(a, b) {
    return a + b;
  },

  fetchData: () => {
    return axios
      .get(`http://localhost:8888/mockconfig/status.cgi_act=status`)
      .then(res => res.data)
      .catch(err => 'error');
  }  
};

module.exports = fn;