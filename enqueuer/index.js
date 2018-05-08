// Old code is still here in case you need to view it, but it's currently unused.
const Config = require('./config.json');
const Poller = require('./poll');

setInterval(async () => {
  console.log('polling...')
  Poller.poll();
}, Config.POLLING_INTERVAL_IN_SECONDS * 1000);

// const AWS = require('aws-sdk');
// const rabbit = require('amqplib').connect(Config.RABBIT_URL);

// AWS.config.update({region: 'us-east-2'});


// ////////////
// // Code for pushing a metric to cloudwatch
// const cloudwatch = new AWS.CloudWatch({apiVersion: '2010-08-01'});

// const event = {
//   MetricData: [{
//     MetricName: 'WhitenTest',
//     Timestamp: new Date(),
//     Unit: 'None',
//     Value: 12
//   }],
//   Namespace: 'WHITEN_KREBS'
// };

// cloudwatch.putMetricData(event, (err, data) => {
//   console.log('err?', err);
//   console.log('data', data);
// });
// /////////////

// /////////////
// // Code for writing to RabbitMQ
// // rabbit.then(connection => {
// //   console.log('creating channel...');
// //   return connection.createChannel();
// // }).then(channel => {
// //   console.log('asserting queue...');
// //   return channel.assertQueue('tasks').then(ok => {
// //     console.log('ok?', ok);
// //     return channel.sendToQueue('tasks', new Buffer(JSON.stringify({url: 'foo.bar'})));
// //   });
// // }).catch(err => {
// //   console.log('catching an error', err);
// // });

// //////////////

// //////////
// // Code for reading messages from RabbitMQ
// rabbit.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   return ch.assertQueue('tasks').then(function(ok) {
//     return ch.consume('tasks', function(msg) {
//       if (msg !== null) {
//         console.log(msg.content.toString());
//         ch.ack(msg);
//       }
//     });
//   });
// }).catch(console.warn);
// ///////////////////