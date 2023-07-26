class Fifo {
  constructor() {
    this.carsList = []
  }

  addCar(car) {
    this.carsList.push(car)
  }

  removeCar() {
    return this.carsList.shift()
  }
}

module.exports = Fifo
