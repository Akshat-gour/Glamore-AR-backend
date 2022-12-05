import asyncHandler from 'express-async-handler'
import ItemResponse from '../models/itemResponseModel.js'

function onlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str)
}
function isValidUrl(string) {
    let url
    try {
        url = new URL(string)
    } catch (_) {
        return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
}

// @desc    Get Data
// @route   GET /api/items
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

// @desc    Create Data
// @route   POST /api/items
// @access  Public
const createData = asyncHandler(async (req, res) => {
    const {
        productName,
        productThumbnailURL,
        productPrice,
        productImages,
        productDescription,
        productClass,
        productModelURL,
    } = req.body

    if (
        !onlyLetters(productName) &&
        !isValidUrl(productThumbnailURL) &&
        !isNaN(productPrice) &&
        productImages.size() == 0 &&
        !onlyLetters(productDescription) &&
        !onlyLetters(productClass) &&
        !isValidUrl(productModelURL)
    ) {
        res.status(400)
        throw new Error('insert valid data')
    }
    // const userExists = await User.findOne({ email })

    // if (userExists) {
    //     res.status(400)
    //     throw new Error('User already exists')
    // }

    const data = await ItemResponse.create({
        productName,
        productThumbnailURL,
        productDescription,
        productPrice,
        productClass,
        productImages,
        productModelURL,
    })

    if (data) {
        res.status(201).json({
            _id: data._id,
            productName: data.productName,
            productThumbnailURL: data.productThumbnailURL,
            productDescription: data.productDescription,
            productPrice: data.productPrice,
            productClass: data.productClass,
            productImages: data.productImages,
            productModelURL: data.productModelURL,
        })
    } else {
        res.status(400)
        throw new Error('Data not inserted')
    }
})

export { fetchAllData, createData }
