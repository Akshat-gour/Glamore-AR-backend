import express from 'express'
const router = express.Router()
import { fetchAllData } from '../controllers/itemController.js'

router.route('/').get(fetchAllData)
export default router
