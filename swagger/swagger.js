const swaggerAutogen = require('swagger-autogen')

const outputFile = './swagger.json'
const endpointsFiles = ['../controller/api.js']

const doc = {
  info: {
    version: '1.0.0',
    title: 'Cars API',
    description: 'Cars API Documentation',
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Car',
      description: 'Endpoints',
    },
    {
      name: 'Log',
      description: 'Endpoints',
    },
  ],
  definitions: {
    Car: {
      title: 'Toro',
      brand: 'Fiat',
      price: '95000',
      age: 2021,
    },
    Cars: [
      {
        _id: '64c08d4894a4c4001c3e1d04',
        title: 'Toro',
        brand: 'Fiat',
        price: '95000',
        age: 2021,
      },
    ],
    Logs: [
      {
        _id: '64c08d485d02ede46fe6a820',
        data_hora: '26/07/2023 0:4:40',
        car_id: '64c08d4894a4c4001c3e1d04',
      },
    ],
    Log: {
      data_hora: '26/07/2023 0:4:40',
      car_id: '64c08d4894a4c4001c3e1d04',
    },
  },
}

swaggerAutogen(outputFile, endpointsFiles, doc)
