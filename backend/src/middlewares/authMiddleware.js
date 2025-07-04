import { verifyToken } from '../utils/token.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    })

    if (!user) return res.status(401).json({ message: 'User not found' })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}
