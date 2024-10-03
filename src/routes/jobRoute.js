import express from 'express'
import { handleAllJobs, handleJobById } from '../controllers/jobControllers.js'


const router = express.Router()
router.get('/all/:jobCategory', handleAllJobs)
router.get('/:jobId', handleJobById)

export default router