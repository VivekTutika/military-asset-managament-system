import { PrismaClient } from '@prisma/client'
import { logAction } from '../utils/logger.js'
const prisma = new PrismaClient()

export const assignAsset = async (req, res) => {
  const baseId = parseInt(req.body.baseId, 10)
  const equipmentTypeId = parseInt(req.body.equipmentTypeId, 10)
  const assignedTo = req.body.assignedTo
  const quantity = parseInt(req.body.quantity, 10)
  try {
    const assignment = await prisma.assignment.create({
      data: { baseId, equipmentTypeId, assignedTo, quantity },
    })
    await logAction({
      userId: req.user.id,
      action: 'ASSIGN_ASSET',
      details: { assignmentId: assignment.id, ...req.body },
    })
    res.status(201).json(assignment)
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign asset' })
  }
}

export const expendAsset = async (req, res) => {
  const baseId = parseInt(req.body.baseId, 10)
  const equipmentTypeId = parseInt(req.body.equipmentTypeId, 10)
  const assignedTo = req.body.assignedTo
  const quantity = parseInt(req.body.quantity, 10)
  const reason = req.body.reason
  try {
    const expenditure = await prisma.expenditure.create({
      data: { baseId, equipmentTypeId, assignedTo, quantity, reason },
    })
    await logAction({
      userId: req.user.id,
      action: 'EXPEND_ASSET',
      details: { expenditureId: expenditure.id, ...req.body },
    })
    res.status(201).json(expenditure)
  } catch (err) {
    res.status(500).json({ message: 'Failed to expend asset' })
  }
}

export const getLogs = async (req, res) => {
  const { baseId } = req.query

  try {
    const assignments = await prisma.assignment.findMany({
      where: { baseId },
      select: { id: true, createdAt: true, personnelId: true, equipmentType: true, quantity: true },
    })

    const expenditures = await prisma.expenditure.findMany({
      where: { baseId },
      select: { id: true, createdAt: true, personnelId: true, equipmentType: true, quantity: true },
    })

    const logs = [
      ...assignments.map((a) => ({ ...a, type: 'assignment' })),
      ...expenditures.map((e) => ({ ...e, type: 'expenditure' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    res.json(logs)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message })
  }
}
