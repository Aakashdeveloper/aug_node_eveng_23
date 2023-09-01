import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const config = require('../config');
const User = require('../model/UserSchema')
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

///list all users
router.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) throw err;
        res.send(user)
    })
})

///register user
router.post('/register',(req,res) => {
    let hashpassword = bcrypt.hashSync(req.body.password);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'Users',
    },(err,result) => {
        res.status(200).send('Register Successfull')
    })
})


module.exports = router;