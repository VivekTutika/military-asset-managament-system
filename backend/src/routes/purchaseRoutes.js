import express from 'express'
import { addPurchase, getPurchases } from '../controllers/purchaseController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.post('/', requireRole('ADMIN', 'LOGISTICS'), addPurchase)
router.get('/', authenticate, requireRole('admin', 'base_commander', 'logistics'), getPurchases)

export default router
