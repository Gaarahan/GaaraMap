class CustomError extends Error {
  constructor (props) {
    super(props)
    this.isCustomError = true
  }
}

module.exports = CustomError
