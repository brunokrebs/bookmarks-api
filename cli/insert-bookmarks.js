const rp = require('request-promise');

const randomUrls = [
  {name: 'Auth0', url: 'https://auth0.com'},
  {name: 'Google', url: 'https://www.google.com'},
  {name: 'My Favorite Place', url: 'https://non-existent.com.br'},
  {name: 'Amazon', url: 'https://www.amazon.com'},
];

setInterval(() => {
  const randomUrl = randomUrls[Math.floor(Math.random() * Math.floor(randomUrls.length))];

  const options = {
    method: 'POST',
    uri: 'http://ec2-18-219-171-58.us-east-2.compute.amazonaws.com:3000/api/bookmarks',
    body: {
      user_id: 123,
      url: randomUrl.url,
      name: randomUrl.name,
    },
    json: true,
  };

  rp(options)
    .then(console.log)
    .catch(console.log);
}, 10);
