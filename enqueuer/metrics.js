const Config = require('./config.json');
const AWS = require('aws-sdk');

AWS.config.update({region: Config.region});

const cloudwatch = new AWS.CloudWatch({apiVersion: '2010-08-01'});

async function write(message) {
  return new Promise((resolve) => {
    const event = {
      MetricData: [{
        MetricName: message.metricName,
        Timestamp: new Date(),
        Unit: 'None',
        Value: message.queueLength
      }],
      Namespace: 'WHITEN_KREBS'
    };

    cloudwatch.putMetricData(event, (err, data) => {
      console.log('err?', err);
      console.log('data', data);
      return resolve(data);
    });
  });

}

module.exports = {
  write
};