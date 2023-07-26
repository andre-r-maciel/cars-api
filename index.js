require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')
const apiRoutes = require('./controller/api')
const error = 'Não foi possível conectar ao banco de dados'

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://Cars:C4r5dB@carscluster.sl8xmxp.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000)
  })
  .catch(() => console.log(error))

app.use('/api', apiRoutes)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
