import express from 'express'
import { handleAllJobs,handleRes, handleJobById } from '../controllers/jobControllers.js'


const router = express.Router()
router.get('/', handleRes)
router.get('/all/:jobCategory', handleAllJobs)
router.get('/:jobId', handleJobById)

export default router