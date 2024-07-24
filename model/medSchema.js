const mongoose = require('mongoose')

const medSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    medId:{
        required:true,
        type:String
    },
    batchNo:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:String
    },
    expiry:{
        required:true,
        type:String
    },
    stock:{
        required:true,
        type:String
    },
    medImage:{
        required:true,
        type:String
    },
    adminId:{
        required:true,
        type:String
    }
})

const medicines = mongoose.model('medicines', medSchema)

module.exports = medicines