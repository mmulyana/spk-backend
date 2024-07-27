const express = require('express')
const cors = require('cors')
const auth = require('./routes/auth')
const kriteria = require('./routes/kriteria')
const pegawai = require('./routes/pegawai')
const akun = require('./routes/akun')
const { ErrorHandler } = require('./helper/error-handler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let api = express.Router()

api.use(auth)
api.use(akun)
api.use(pegawai)
api.use(kriteria)

app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  })
})

app.use('/api', api)

app.use((req, res, next) => {
  next({ err: 'not found' })
})

app.use(ErrorHandler)

app.listen(5000, () => {
  console.log('server is running in http://localhost:5000')
})
