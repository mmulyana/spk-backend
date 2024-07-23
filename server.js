const express = require('express')
const cors = require('cors')
const auth = require('./routes/auth')
const kriteria = require('./routes/kriteria')
const pegawai = require('./routes/pegawai')
const akun = require('./routes/akun')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

let api = express.Router()

api.use(auth)
api.use(akun)
api.use(pegawai)
api.use(kriteria)

app.use('/api', api)

app.listen(5000, () => {
  console.log('server is running in http://localhost:8000')
})
