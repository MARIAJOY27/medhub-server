const orders = require("../model/orderSchema");
const users = require("../model/userSchema");
const jwt = require('jsonwebtoken')

//logic to resolve register request
exports.register = async(req,res)=>{
    console.log('inside register controller');
    const {username, email, password} = req.body
    console.log(username, email, password);

    try {
         const existingUser = await users.findOne({mailId:email})
         if(existingUser){
            res.status(406).json('Account already exists')
         }
         else{
            //object for the model
            const newUser = new users({
                username,
                mailId:email,
                password,
                address:"",
                role:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
         }
    } catch (error) {
        res.status(401).json(error)
    }
}

//login controller
exports.login = async(req,res)=>{
    console.log('inside login function');
    const {email, password} = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({mailId:email,password})
        if(existingUser){
            const {password,...userdata} = existingUser._doc
            const token = jwt.sign({userId:existingUser._id,user:JSON.stringify(userdata)},'supersecretkey')
            res.status(200).json({
                existingUser,
                token
            })
        }
        else{
            res.status(401).json('Invalid Email ID or password')
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json(`Request failed due to ${error}`)
    }
}

//update profile
exports.updateProfileController = async(req,res)=>{
    const userId = req.payload

    const {username, password,email, address, profile} = req.body
    profileImg = req.file?req.file.filename:profile
    
    try {
        const existingUser = await users.findByIdAndUpdate({_id:userId},{username,mailId:email,password,address,profile:profileImg},{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }

}

exports.countUserController = async(req,res)=>{
    try {
        const count = await users.countDocuments()
        res.status(200).json({count})
        
    } catch (error) {
        res.status(500).send('Error counting documents',`${error}`);
    }
}

//get all users
exports.getAllUserController = async(req,res)=>{
    try {
        const allUsers = await users.find()
        res.status(200).json(allUsers)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

//delete user
exports.deleteUserController = async(req,res)=>{
    const {id}= req.params

    try {
        const user = await users.findByIdAndDelete({_id:id})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await orders.deleteMany({ user: id })
        res.status(200).json({ message: 'User and associated orders deleted successfully' });
        
    } catch (error) {
        res.status(500).json(`Request failed due to ${error}`)
        
    }
}

