import mongoose from 'mongoose'

const itemResponseSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productThumbnailURL: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productImages: [{ type: String }],
    productDescription: {
        type: String,
        required: true,
    },
    productClass: {
        type: String,
        required: true,
    },
    productModelURL: {
        type: String,
        required: true,
    },
})

const ItemResponse = mongoose.model('ItemResponse', itemResponseSchema)

export default ItemResponse
