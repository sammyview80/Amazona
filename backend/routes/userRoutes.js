import express from 'express';

import User from '../models/userModel';
import {getToken} from '../utils';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (signinUser){
        const data = {
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        }
        console.log(data)
        res.send(data)
    }
    else{
        res.status(401).send({msg: "Invalid Email or Password."})
    }
})

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    const newUser = await user.save();
    if (newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    }
    else{
        res.status(401).send({msg: "Invaild user data."})
    }
})

router.get('/createadmin', async (req, res) => {
    try{
        const user = new User({
            name: "Saman",
            email: "Samanshrestha@gmail.com",
            password: 'saman',
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(newUser);
    }
    catch(error) {
        res.send({msg: error.message})
    }
})

export default router;