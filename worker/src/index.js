const Config = require('../config.json');
const rp = require('request-promise');
const rabbit = require('amqplib').connect(Config.RABBIT_URL);

async function consumeTasks() {
  try {
    const conn = await rabbit;
    const channel = await conn.createChannel();
    await channel.assertQueue('bookmarks');

    channel.consume('bookmarks', async (bookmark) => {
      await checkBookmark(JSON.parse(bookmark.content.toString()));
      channel.ack(bookmark);
    });
  } catch (err) {
    console.warn(err);
    // keep going
    consumeTasks();
  }
}

async function checkBookmark(bookmark) {
  console.log(bookmark);
  try {
    await rp(bookmark.url);
    await patchBookmark(bookmark, true);
  } catch (err) {
    await patchBookmark(bookmark, false)
  }
}

async function patchBookmark(bookmark, status) {
  const options = {
    method: 'PATCH',
    uri: Config.BOOKMARKS_API,
    body: {
      id: bookmark.id,
    },
    json: true,
  };

  options.body.is_ok = true;
  try {
    await rp(options);
    console.log(`${bookmark.url} patched as ${status ? 'available' : 'not available'}!`);
  } catch (err) {
    console.log(err);
  }
}

consumeTasks();

