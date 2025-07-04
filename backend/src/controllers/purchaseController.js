import { PrismaClient } from '@prisma/client'
import { logAction } from '../utils/logger.js'
const prisma = new PrismaClient()

export const addPurchase = async (req, res) => {
  const baseId = parseInt(req.body.baseId, 10)
  const equipmentTypeId = parseInt(req.body.equipmentTypeId, 10)
  const quantity = parseInt(req.body.quantity, 10)
  try {
    const purchase = await prisma.purchase.create({
      data: { baseId, equipmentTypeId, quantity },
    })
    await logAction({
      userId: req.user.id,
      action: 'CREATE_PURCHASE',
      details: { purchaseId: purchase.id, ...req.body },
    })
    res.status(201).json(purchase)
  } catch (err) {
    res.status(500).json({ message: 'Failed to add purchase' })
  }
}

export const getPurchases = async (req, res) => {
  const { baseId } = req.query

  try {
    const purchases = await prisma.purchase.findMany({
      where: baseId ? { baseId } : {},
      orderBy: { createdAt: 'desc' },
    })
    res.json(purchases)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch purchases', error: err.message })
  }
}
