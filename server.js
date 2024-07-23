const express = require('express')
const cors = require('cors')
const auth = require('./routes/auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

let api = express.Router()

api.use(auth)

app.use('/api', api)

app.listen(5000, () => {
  console.log('server is running in http://localhost:8000')
})
