const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ region: process.env.AWS_REGION });
const queueUrl = process.env.SQS_QUEUE_URL;

const sendMessage = async (task) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(task),
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log('Message sent to SQS:', result.MessageId);
  } catch (error) {
    console.error('Error sending message to SQS:', error);
    throw new Error('Error sending message to SQS');
  }
};

module.exports = { sendMessage };
