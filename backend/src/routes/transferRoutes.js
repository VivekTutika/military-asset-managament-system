import express from 'express'
import { transferAsset, getTransfers } from '../controllers/transferController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.post('/', authenticate, requireRole('admin', 'base_commander', 'logistics'), transferAsset)
router.get('/', authenticate, requireRole('admin', 'base_commander', 'logistics'), getTransfers)

export default router
