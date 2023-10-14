const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Music Students API',
    description: 'CSE341 Personal Project - Music Students & Books',
  },
  // host: 'localhost:8080',
  host: 'js-musicstudents-cse341.onrender.com',
  schemes: ['https'],
  // schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);