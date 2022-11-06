import asyncHandler from 'express-async-handler'
import ItemResponse from '../models/itemResponseModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const fetchAllData = asyncHandler(async (req, res) => {
    const user = await ItemResponse.find({})

    if (user) {
        res.send(user)
    } else {
        res.status(401)
        throw new Error('No data')
    }
})

export { fetchAllData }
