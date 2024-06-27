const dynamodb = require('./dynamodb');

const TABLE_NAME = process.env.DYNAMODB_TABLE;

const TaskModel = {
  async create(task) {
    const params = {
      TableName: TABLE_NAME,
      Item: task,
    };
    return dynamodb.put(params).promise();
  },

  async getAll() {
    const params = {
      TableName: TABLE_NAME,
    };
    return dynamodb.scan(params).promise();
  },

  async getById(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return dynamodb.get(params).promise();
  },

  async update(task) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: task.id },
      UpdateExpression: 'set descricao = :descricao',
      ExpressionAttributeValues: {
        ':descricao': task.descricao,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    return dynamodb.update(params).promise();
  },

  async delete(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return dynamodb.delete(params).promise();
  },
};

module.exports = TaskModel;
