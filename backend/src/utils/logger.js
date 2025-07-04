import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const logAction = async ({ userId, action, details }) => {
  try {
    await prisma.apiLog.create({
      data: {
        userId,
        action,
        details: typeof details === 'string' ? details : JSON.stringify(details),
      },
    })
  } catch (err) {
    console.error('API Log Error:', err)
  }
}
