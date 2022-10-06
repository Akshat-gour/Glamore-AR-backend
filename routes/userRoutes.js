import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    checkUser,
} from '../controllers/userController.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.post('/check', checkUser)
export default router
