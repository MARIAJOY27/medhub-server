//model for users collection
const mongoose = require('mongoose')

//schema
const orderSchema = mongoose.Schema({
    user:{
        require:true,
        type:Object
    },
    medicine:{
        require:true,
        type:Object
    },
    quantity:{
        require:true,
        type:Number
    },
    userId:{
        require:true,
        type:String
    }
})

const orders = mongoose.model('orders',orderSchema)

module.exports = orders