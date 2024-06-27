const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ 
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sendMessage = async (task) => {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify({
      descricao: task.descricao,
      id: task.id,
    }),
  };

  return sqs.sendMessage(params).promise();
};

module.exports = { sendMessage };
