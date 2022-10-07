import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const checkUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (user) {
        res.json({
            isExist: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            imageURL: user.imageURL,
        })
    } else {
        res.status(401).json({
            isExist: false,
        })
        throw new Error('Invalid user')
    }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, mobileNo, imageURL, ID } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        mobileNo,
        imageURL,
        ID,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            imageURL: user.imageURL,
            ID: user.ID,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export { authUser, registerUser, checkUser }
