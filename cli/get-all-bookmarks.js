const rp = require('request-promise');

const options = {
  method: 'GET',
  uri: 'http://ec2-18-218-232-47.us-east-2.compute.amazonaws.com:3000/api/bookmarks',
};

rp(options)
  .then((data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData.length);
  })
  .catch(console.log);
