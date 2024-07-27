const handlePrismaError = (err) => {
  switch (err.code) {
    case 'P2002':
      return new Error(`Duplicate field value: ${err.meta.target}`, 400)
    case 'P2014':
      return new Error(`Invalid ID: ${err.meta.target}`, 400)
    case 'P2003':
      return new Error(`Invalid input data: ${err.meta.target}`, 400)
    default:
      return new Error(`Something went wrong: ${err.message}`, 500)
  }
}

module.exports = { handlePrismaError }
