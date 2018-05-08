const Config = require('./config.json');
const rabbit = require('amqplib').connect(Config.RABBIT_URL);

const QUEUE_NAME = 'bookmarks';

// TODO: keep the channel open
// future work?
async function push(message) {
  // Code for writing to RabbitMQ
  try {
    const connection = await rabbit;
    const channel = await connection.createChannel();
    const ok = channel.assertQueue(QUEUE_NAME);
    const response = channel.sendToQueue(QUEUE_NAME, new Buffer(JSON.stringify(message)));
    return response;
  } catch (err) {
    console.log('what is the err?', err);
  }
}

// TODO: refactor this
async function checkLength() {
  try {
    const connection = await rabbit;
    const channel = await connection.createChannel();
    const ok = channel.assertQueue(QUEUE_NAME);
    const assertion = await ok;
    console.log('why?', assertion);
    return assertion.messageCount;
  } catch (err) {
    console.log('what is the err?', err);
  }
}

module.exports = {
  push,
  checkLength
};