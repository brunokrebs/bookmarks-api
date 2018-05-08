const rp = require('request-promise');

const bookmarks = [
  {name: 'Auth0', url: 'https://auth0.com'},
  {name: 'Google', url: 'https://www.google.com'},
  {name: 'My Favorite Place', url: 'https://non-existent.com.br'},
  {name: 'Amazon', url: 'https://www.amazon.com'},
];

bookmarks.forEach((bookmark) => {
  rp(bookmark.url).then(() => {
    console.log(`${bookmark.url} is ok`);
  }).catch(() => {
    console.error(`${bookmark.url} is not ok`);
  });
});
