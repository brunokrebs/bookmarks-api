const Bookmarks = require('./bookmarks');
const Queue = require('./queue');
const Metrics = require('./metrics');
/**
 * Poll bookmarks to hydrate the worker queue
 *  1: GET /bookmarks
 *  2: For each bookmark, publish a message onto RabbitMQ
 *  3: Publish quque length into Cloudwatch
 */
async function poll() {
  const bookmarks = await Bookmarks.getAll();
  console.log(bookmarks.length);

  const queueLength = await Queue.checkLength();
  console.log('queue length?', queueLength);
  // TODO: I don't know if this map call is parallelizing as expected with async/await
  // future investigation if time permits
  const foo = await bookmarks.map(async b => {
    const response = await Queue.push({
      id: b.id,
      url: b.url
    });
    // console.log('response', response);
  });

  const response = await Metrics.write({
    metricName: 'WHITEN_KREBS_QUEUE_LENGTH',
    queueLength: queueLength + bookmarks.length // TODO: should we read the Rabbit length instead?
  });
  console.log('Metric sent', response);
  // TODO: clean up open connections (rabbit)
  process.exit();
}

poll();