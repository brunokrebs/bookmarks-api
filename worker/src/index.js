const Config = require('../config.json');
const rp = require('request-promise');
const rabbit = require('amqplib').connect(Config.RABBIT_URL);

async function consumeTasks() {
  try {
    const conn = await rabbit;
    const channel = await conn.createChannel();
    channel.prefetch(1);
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
  let available = false;
  try {
    await rp(bookmark.url);
    available = true;
  } catch (err) {
    available = false;
  }

  try {
    await patchBookmark(bookmark, available);
  } catch (err) {
    // no op
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

  options.body.is_ok = status;
  try {
    await rp(options);
    console.log(`${bookmark.url} patched.`);
  } catch (err) {
    console.warn('error while patching bookmark - ' + (err.message ? err.message : ''));
  }
}

consumeTasks();

