const ErrorHandler = (err, req, res, next) => {
  const code = err.code || 500
  const message = err.message || 'Something went wrong'

  res.status(code).json({
    status: code,
    message,
  })
}

module.exports = { ErrorHandler }
