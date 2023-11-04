const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Julie\'s Music Studio API',
    description: 'Temple API'
  },
  host: 'js-musicstudents-cse341.onrender.com',
  schemes: ['https']
  // host: 'localhost:8080',
  // schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);

