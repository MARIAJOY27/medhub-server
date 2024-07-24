const express = require('express')

//import  usercontroller
const usercontroller = require('./controllers/userController')
const medController = require('./controllers/medController')
const orderController = require('./controllers/orderController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')

const router = new express.Router()

//path to resolve register request
router.post('/user/register',usercontroller.register)

//path to resolve login request
router.post('/user/login',usercontroller.login)

//path to add medicine
router.post('/medicines',jwtMiddleware ,multerConfig.single('medImage') , medController.addMed)

//path to get all medicines at userpg
router.get('/all-medicines',medController.getAllMedController)

//path to get all medicines at admin pg
router.get('/all-medadmin',medController.getAllMedAdminController)

//path to delete a medicine
 router.delete('/delete-medicine/:id',jwtMiddleware,medController.deleteAMedController)

 //path to update medicine
 router.put('/update-med/:id',jwtMiddleware,multerConfig.single('medImage'),medController.updateMedController)

 //path to edit profile
 router.put('/update-profile',jwtMiddleware,multerConfig.single('profile'),usercontroller.updateProfileController)

 //path to place order
 router.post('/place-order',jwtMiddleware,orderController.placeOrderController)

 //path to get ordered medicine
  router.get('/getuser-med',jwtMiddleware,orderController.getUserOrderController)

  //path to get all ordered medicines at admin page
  router.get('/getAll-med',orderController.getAllOrderController)

 //path to delete ordered medicines
  router.delete('/delete-order/:id',jwtMiddleware,orderController.deleteOrderController)

  //path to get count of medicines
  router.get('/count-medicines',medController.countMedController)

   //path to get count of users
   router.get('/count-users',usercontroller.countUserController)

   //path to get all users
   router.get('/all-users',usercontroller.getAllUserController)

   //path to delete user
   router.delete('/delete-user/:id',usercontroller.deleteUserController)

   //path to get out-of-stock med
   router.get('/count-oos-med',medController.countOofMedController)

   //path to get count of orders
   router.get('/count-orders',orderController.countOrderController)

   //path to delete user orders
   router.delete('/delete-userorders/:id',jwtMiddleware,orderController.deleteUserOrderController)



//EXPORT ROUTER
module.exports = router