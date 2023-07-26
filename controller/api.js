const axios = require('axios')
const router = require('express').Router()

const Log = require('../models/Log')
const getCurrentTime = require('../helpers/getCurrentTime')
const Fifo = require('../helpers/fifo')
const externalApi = 'http://api-test.bhut.com.br:3000/api/cars'
const serverError = 'Erro no servidor'

var car = require('../view/requestCar')

//primeiro serviço
router.get('/listCars', async (req, res) => {
  // #swagger.tags = ['Car']
  // #swagger.description = 'List cars of external API'
  /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Cars"},
      description: 'List of cars'
  }
  */

  try {
    const response = await axios.get(externalApi)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ erro: serverError })
  }
})

//segundo serviço
router.post('/createCar', async (req, res) => {
  // #swagger.tags = ['Car']
  // #swagger.description = 'Post car in external API'
  /* #swagger.parameters['Car'] = {
      in: 'body',
      description: 'Car informations',
      required: true,
      schema: { $ref: "#/definitions/Car"}
  }
  */
  /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Log"},
      description: 'Car created'
  }
  */

  car = req.body

  try {
    const response = await axios.post(externalApi, car)

    const infoCar = {
      data_hora: getCurrentTime(),
      car_id: response.data._id,
    }

    await Log.create(infoCar)

    const carsStructure = new Fifo()
    carsStructure.addCar(response.data)
    const removedCar = carsStructure.removeCar()

    await axios.post(
      'https://webhook.site/860211eb-fad6-4534-8b3e-6028ba5f900d',
      removedCar
    )

    res.status(201).json(infoCar)
  } catch (error) {
    res.status(500).json({ erro: serverError })
  }
})

//terceiro serviço
router.get('/logs', async (req, res) => {
  // #swagger.tags = ['Log']
  // #swagger.description = 'List logs of created cars by this API'
  /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Logs"},
      description: 'List of logs'
  }
  */

  try {
    const log = await Log.find()
    res.status(200).json(log)
  } catch (error) {
    res.status(500).json({ erro: serverError })
  }
})

module.exports = router
