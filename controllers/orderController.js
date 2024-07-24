const orders = require("../model/orderSchema");


exports.placeOrderController = async(req,res)=>{
     const data = {...req.body,user:req.user}
     
    try {
        const order = new orders(data)
        console.log(order);
        await order.save()
        res.status(200).json(order)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
    
}

exports.getUserOrderController = async(req,res)=>{
    const data = {...req.body,user:req.user}
   
    try {

        const allUserMedicine = await orders.find({"user._id":req.user._id})
        //console.log(allUserMedicine);
        res.status(200).json(allUserMedicine)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getAllOrderController = async(req,res)=>{
    const data = {...req.body,user:req.user}

    try {
        
        const allOrderMedicine = await orders.find()
        console.log(allOrderMedicine);
        res.status(200).json(allOrderMedicine)

    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.deleteOrderController = async(req,res)=>{
     console.log(req.params);
     const {id} = req.params
     
    try {
        const result = await orders.findByIdAndDelete({_id:id})
        res.status(200).json(result)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.countOrderController = async(req,res)=>{
    try {
        const count = await orders.countDocuments()
        res.status(200).json({count})
        
    } catch (error) {
        res.status(500).send('Error counting documents',`${error}`);
    }
}

exports.deleteUserOrderController = async(req,res)=>{
    const userId = req.payload

    try {
      const result = await orders.deleteMany({userId})
      //console.log('DELETED ORDERS',result);
      if (result.deletedCount > 0) {
        res.status(200).json('Orders deleted successfully');
    } else {
        res.status(404).json('No orders found for this user');
    }
      
    } catch (error) {
      res.status(500).json(error)
    }
}