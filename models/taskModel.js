const dynamodb = require('./dynamodb');

const TABLE_NAME = process.env.DYNAMODB_TABLE;

class TaskModel {
  constructor(task) {
    this.task = task || {}; // Inicializa com um objeto vazio caso não haja dados
  }

  async create() {
    const params = {
      TableName: TABLE_NAME,
      Item: this.task,
    };
    return dynamodb.put(params).promise();
  }

  async getAll() {
    const params = {
      TableName: TABLE_NAME,
    };
    const data = await dynamodb.scan(params).promise();
    return data.Items;
  }

  async getById(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    const data = await dynamodb.get(params).promise();
    return data.Item;
  }

  async update() {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: this.task.id },
      UpdateExpression: 'set descricao = :descricao',
      ExpressionAttributeValues: {
        ':descricao': this.task.descricao,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    return dynamodb.update(params).promise();
  }

  async delete(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return dynamodb.delete(params).promise();
  }
}

module.exports = TaskModel;
