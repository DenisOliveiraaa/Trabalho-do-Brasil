const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer
  };

  return s3.upload(params).promise();
};

const getFile = async (fileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName
  };

  return s3.getObject(params).createReadStream();
};

module.exports = { uploadFile, getFile };
