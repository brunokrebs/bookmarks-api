const axios = require('axios');
const Config = require('./config.json');

async function getAll() {
  const response = await axios.get(Config.BOOKMARKS_API);
  if (response.status !== 200) {
    console.log('Error polling', response.status);
  }
  return response.data;
}

module.exports = {
  getAll
};
