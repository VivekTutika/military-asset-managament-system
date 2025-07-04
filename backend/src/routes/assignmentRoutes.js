import express from 'express'
import {
  assignAsset,
  expendAsset,
  getLogs,
} from '../controllers/assignmentController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.post('/assign', authenticate, requireRole('admin', 'base_commander'), assignAsset)
router.post('/expend', authenticate, requireRole('admin', 'base_commander'), expendAsset)
router.get('/logs', authenticate, requireRole('admin', 'base_commander'), getLogs)

export default router
