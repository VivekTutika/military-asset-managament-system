import { PrismaClient } from '@prisma/client'
import { logAction } from '../utils/logger.js'
const prisma = new PrismaClient()

export const transferAsset = async (req, res) => {
  const { fromBaseId, toBaseId, equipmentType, quantity } = req.body

  try {
    const transfer = await prisma.transfer.create({
      data: { fromBaseId, toBaseId, equipmentType, quantity },
    })

    await logAction({
      userId: req.user.id,
      action: 'TRANSFER',
      details: `Transferred ${quantity} ${equipmentType} from base ${fromBaseId} to base ${toBaseId}`,
    })

    res.status(201).json(transfer)
  } catch (err) {
    res.status(500).json({ message: 'Transfer failed', error: err.message })
  }
}

export const getTransfers = async (req, res) => {
  const { baseId } = req.query

  try {
    const transfers = await prisma.transfer.findMany({
      where: baseId
        ? {
            OR: [{ fromBaseId: baseId }, { toBaseId: baseId }],
          }
        : {},
      orderBy: { createdAt: 'desc' },
    })

    res.json(transfers)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transfers', error: err.message })
  }
}

export const addTransfer = async (req, res) => {
  const fromBaseId = parseInt(req.body.fromBaseId, 10)
  const toBaseId = parseInt(req.body.toBaseId, 10)
  const equipmentTypeId = parseInt(req.body.equipmentTypeId, 10)
  const quantity = parseInt(req.body.quantity, 10)
  try {
    const transfer = await prisma.transfer.create({
      data: { fromBaseId, toBaseId, equipmentTypeId, quantity },
    })
    await logAction({
      userId: req.user.id,
      action: 'CREATE_TRANSFER',
      details: { transferId: transfer.id, ...req.body },
    })
    res.status(201).json(transfer)
  } catch (err) {
    res.status(500).json({ message: 'Failed to add transfer' })
  }
}
