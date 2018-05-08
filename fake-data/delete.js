const rp = require('request-promise');

const options = {
  method: 'DELETE',
  uri: 'http://ec2-18-218-232-47.us-east-2.compute.amazonaws.com:3000/api/bookmarks',
};

rp(options)
  .then(console.log)
  .catch(console.log);
