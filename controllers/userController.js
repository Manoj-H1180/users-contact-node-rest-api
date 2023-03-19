const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please Enter All The Fields')
    }

    const userAvailable = await User.findOne({ email })
    if (userAvailable){
        res.status(400)
        throw new Error('User already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const registerUser = await User.create({
        username, email, password: hashedPassword,
    })

    if (registerUser){
        res.status(201).json({_id: registerUser.id, email: registerUser.email})
    }else{
        res.status(400)
        throw new Error('Not a valid user data')
    }

    res.json({message: 'Register Route'})
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password){
        res.status(400)
        throw new Error('All Fields Are Required')
    }
    const findUser = await User.findOne({email})
    if (findUser && (await bcrypt.compare(password, findUser.password))){
        const accessToken = jwt.sign({
            user: {
                username: findUser.username,
                email: findUser.email,
                id: findUser.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error('Email or Password Are Not Valid')
    }
    res.json({message: 'Login Route'})
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});


module.exports={registerUser, loginUser, currentUser}