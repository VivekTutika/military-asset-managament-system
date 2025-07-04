import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const apiLogger = async (req, res, next) => {
  // Only log if user is authenticated
  if (req.user) {
    await prisma.apiLog.create({
      data: {
        userId: req.user.id,
        action: `${req.method} ${req.originalUrl}`,
        details: JSON.stringify(req.body || {}),
      },
    })
  }
  next()
}