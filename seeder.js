import dotenv from 'dotenv'
import users from './data/ItemResponse.js'
import User from './models/itemResponseModel.js'
import connectDB from './config/db.js'
dotenv.config()
connectDB()
const importData = async () => {
    try {
        await User.deleteMany()
        const createdUsers = await User.insertMany(users)
        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
} else {
    importData()
}
