const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Route1: Signup router created at POST at '/api/auth/signup' . No login required
router.post('/signup', [
    body('name', 'Enter valid name').isLength({min:3}),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password must be atleast 5 char long').isLength({min:5}),
    body('role').notEmpty()
] , async (req, res)=>{

    let success = false;
    // if valiation error arries
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
    }

    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
        }

        // used bcrypt to store hash of the password into database instead of password itself
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            role: req.body.role
        })
        // get data of user after creating them thro' its unique id
        const data = {
            user:{
                id: user.id,
                role: user.role,
                name: user.name
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({success, authToken, user:{name:user.name}});

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route2: Login router created at POST at '/api/auth/login' . No login required
router.post('/login',[
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res)=>{

    let success = false;
    // if valiation error arries
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
    }

    try {
        // check if user exists
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({success, error: "Enter valid credentials"})
        }
        
        // compare entered password with db password
        const comaprePassword = await bcrypt.compare(req.body.password, user.password);
        if(!comaprePassword){
            return res.status(400).json({success, error: "Enter valid credentials"})
        }
        
        // Access user data with the help of id
        const data = {
            user:{
                id: user.id,
                role: user.role,
                name: user.name
            }
        }
        const authToken = await jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({success, authToken, user:{name:user.name}});

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})


module.exports = router;