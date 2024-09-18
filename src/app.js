const express = require("express")
require('dotenv').config()
const cors = require('cors')
const {dbConnection} = require('./database/config') 

const app = express()

//DB
dbConnection()

// CORS
app.use(cors())

//Midelware
app.use( express.static('public'))


// Middleware auto -> Lectura y parseo del body
app.use( express.json() )

// Endpoint
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})