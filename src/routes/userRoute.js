import express from 'express'
import { handleUserRegister, handleUserLogin, handleUserLogout } from '../controllers/userController.js'


const router = express.Router()
router.post('/register', handleUserRegister)
router.post('/login', handleUserLogin)
router.post('/logout', handleUserLogout)

export default router;