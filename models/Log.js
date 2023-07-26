const mongoose = require('mongoose')

const Log = mongoose.model('Log', {
  data_hora: String,
  car_id: String,
})

module.exports = Log
