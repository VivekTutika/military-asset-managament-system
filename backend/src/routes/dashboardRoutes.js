import express from 'express'
import { getDashboardStats } from '../controllers/dashboardController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.get('/', authenticate, requireRole('admin', 'base_commander'), getDashboardStats)

export default router
