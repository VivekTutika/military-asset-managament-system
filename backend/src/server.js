import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'

// Routes
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import purchaseRoutes from './routes/purchaseRoutes.js'
import transferRoutes from './routes/transferRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import { apiLogger } from './middlewares/apiLogger.js'
import { authenticate } from './middlewares/authMiddleware.js'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/purchases', purchaseRoutes)
app.use('/api/transfers', transferRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api', authenticate, apiLogger)

app.get('/', (req, res) => {
  res.send('Military Asset Management System API running 🪖')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})
