const medicines = require("../model/medSchema");

exports.addMed = async(req,res)=>{
    console.log('inside add req');
    console.log(req.payload);
    const adminid = req.payload

    const medImage = req.file.filename
    const {title,medId,batchNo,price,expiry,stock} = req.body
    console.log(title,medId,batchNo,price,expiry,stock);

    try {
       const existingMedicine = await medicines.findOne({medId})
       if(existingMedicine){
        res.status(406).json('Medicine already exists')
       }
       else{
        const newMed = new medicines({
            title,medId,batchNo,price,expiry,stock,medImage,adminId:adminid
        })
        await newMed.save()
        res.status(200).json(newMed)
       }
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getAllMedController = async(req,res)=>{
    const searchkey = req.query.search
    //console.log(searchkey);
    try {
        const query = {
            title:{
                $regex:searchkey,$options:'i'
            }
        }

        const allMedicine = await medicines.find(query)
        res.status(200).json(allMedicine)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getAllMedAdminController = async(req,res)=>{
   
    try {

        const allMedicine = await medicines.find()
        res.status(200).json(allMedicine)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.deleteAMedController = async(req,res)=>{
    //console.log(req);
    const {id} = req.params
    try {
      const result = await medicines.findByIdAndDelete({_id:id})
      res.status(200).json(result)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
        
    }

}

exports.updateMedController = async(req,res)=>{
    const {id} = req.params
    const {title,medId,batchNo,price,expiry,stock,medImage} = req.body

    const uploadImg = req.file?req.file.filename:medImage

    try {
        const existingMedicine = await medicines.findByIdAndUpdate({_id:id},{title,medId,batchNo,price,expiry,stock,medImage:uploadImg},{new:true})
        await existingMedicine.save()
        res.status(200).json(existingMedicine)

        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getBuyMedController = async(req,res)=>{
    const {id} = req.params
    try {
        const result = await medicines.findById({_id:id})
        res.status(200).json(result)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.countMedController = async(req,res)=>{
    try {
        const count = await medicines.countDocuments()
        res.status(200).json({count})
        
    } catch (error) {
        res.status(500).send('Error counting documents',`${error}`);
    }
}

exports.countOofMedController = async(req,res)=>{
    try {
        const counts = await medicines.countDocuments({stock: 'Out of stock' || 'out of stock'})
        console.log('Out of stock count:', counts);
        res.json({counts});
        
    } catch (error) {
        res.status(500).send('Error counting documents',`${error}`);
    }
}