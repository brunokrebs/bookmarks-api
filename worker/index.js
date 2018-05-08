const rp = require('request-promise');

const bookmarks = [
  {id :1638, url: 'https://www.amazon.com'},
  {id :1639, url: 'https://non-existent.com.br'},
  {id :1640, url: 'https://auth0.com'},
  {id :1645, url: 'https://www.google.com'},
];

const apiUrl = 'http://ec2-18-218-232-47.us-east-2.compute.amazonaws.com:3000/api/bookmarks';

bookmarks.forEach(async (bookmark) => {
  const options = {
    method: 'PATCH',
    uri: apiUrl,
    body: {
      id: bookmark.id,
    },
    json: true,
  };

  rp(bookmark.url).then(() => {
    options.body.is_ok = true;
    rp(options).then(() => {
      console.log(`${bookmark.url} patched as OK`);
    }).catch(console.log);
  }).catch(() => {
    options.body.is_ok = false;
    rp(options).then(() => {
      console.log(`${bookmark.url} patched as NOT OK`);
    }).catch(console.log);
  });
});
