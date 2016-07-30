import express from 'express'
import usersApi from './users/'

const router = express.Router()

// API routes
router.use('/users', usersApi)

export default router
