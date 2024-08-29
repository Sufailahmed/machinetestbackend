const express=require('express')
const userController=require('../Controller/userController')

const router=new express.Router();
const User=require("../Model/userModel")
const jwtMiddleware=require('../Middlewares/jwtmiddleware')

router.post('/users/login',userController.login)
router.post("/users/register", async(req, res) => {

    

    try {
        const newuser = new User(req.body)
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});
router.get('/users/getAllUsers',userController.getallUsers)




module.exports=router;