const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'A simple CRUD API to manage tasks',
      contact: {
        name: 'Your Name',
        email: 'your-email@example.com',
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
