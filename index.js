
require('dotenv').config()

const express = require('express')

const cors = require('cors')

//import router
const router = require('./router')

//import mongodb
require('./db/connection')

const medHubServer = express()

medHubServer.use(cors())

medHubServer.use(express.json())

medHubServer.use(router)

medHubServer.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT


medHubServer.listen(PORT,()=>{
    console.log(`MedHub application running successfully at port ${PORT}`);
})

