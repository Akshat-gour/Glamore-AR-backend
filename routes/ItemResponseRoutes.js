import express from 'express'
const router = express.Router()
import { fetchAllData, createData } from '../controllers/itemController.js'

router.route('/').get(fetchAllData).post(createData)
export default router
