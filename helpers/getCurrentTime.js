function getCurrentTime() {
  const timestamp = new Date()

  const day = ('0' + timestamp.getDate()).slice(-2)
  const month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
  const year = timestamp.getFullYear()
  const hours = timestamp.getHours()
  const minutes = timestamp.getMinutes()
  const seconds = timestamp.getSeconds()

  const currentTime =
    day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

  return currentTime
}

module.exports = getCurrentTime
