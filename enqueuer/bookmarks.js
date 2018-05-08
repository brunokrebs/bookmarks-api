const axios = require('axios');

async function getAll() {
  const response = await axios.get('http://ec2-18-218-232-47.us-east-2.compute.amazonaws.com:3000/api/bookmarks');
  if (response.status !== 200) {
    console.log('Error polling', response.status);
  }
  return response.data;
}

module.exports = {
  getAll
};