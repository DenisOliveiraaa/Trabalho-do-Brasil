const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trabalho do Brasil',
      version: '1.0.0',
      description: 'CRUD de tarefas',
      contact: {
        name: 'Denis',
        email: 'denis.9697@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};  

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
