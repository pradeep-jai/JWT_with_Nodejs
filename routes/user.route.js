const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

router.post('/signup', async (req,res) => {
    try {
        let hash = await bcrypt.hash(req.body.password,10);
        const user = new User({
            email : req.body.email,
            password : hash
        });

        let result = await user.save();
        if (result && Object.keys(result).length > 0) {
            res.status(200).json({
                success : `New user has been created..`
            });
        }else {
            throw new Error(`Something went wrong ..!!`)
        };        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

router.post('/signin', async (req, res) => {
    try {
       let user = await User.findOne({email : req.body.email});
       if (user && Object.keys(user).length > 0) {
           let result = await bcrypt.compare(req.body.password,user.password);
           
           if (result) {
                const JWTToken = jwt.sign({
                    email : user.email,
                    _id : user._id
                },
                'secret',
                {
                    expiresIn: '2h' 
                })
                
               return res.status(200).json({
                   success : `Welcome to the JWT Auth`,
                   token : JWTToken
               });
           } else {
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
           };
       } else {
           throw new Error(`Something went wrong..`)
       }
    } catch (error) {
        res.status(500).json({
            error : error.message
        });
    };
})

module.exports = router;