import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding started...')

  // Create Bases
  const baseAlpha = await prisma.base.create({
    data: {
      name: 'Base Alpha',
      location: 'Location A'
    }
  })

  const baseBravo = await prisma.base.create({
    data: {
      name: 'Bravo Base',
      location: 'Eastern Region'
    }
  })

  // Equipment Types
  const rifle = await prisma.equipmentType.create({
    data: {
      name: 'Assault Rifle',
      category: 'Weapon'
    }
  })

  const jeep = await prisma.equipmentType.create({
    data: {
      name: 'Military Jeep',
      category: 'Vehicle'
    }
  })

  // Users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@military.com',
      password: await bcrypt.hash('admin123', 10), // hashed password
      role: 'ADMIN'
    }
  })

  const commanderAlpha = await prisma.user.create({
    data: {
      name: 'Commander Alpha',
      email: 'commander.alpha@military.com',
      password: await bcrypt.hash('commander123', 10), // hashed password
      role: 'COMMANDER',
      baseId: baseAlpha.id
    }
  })

  const logisticsBravo = await prisma.user.create({
    data: {
      name: 'Logistics Bravo',
      email: 'logistics.bravo@military.com',
      password: await bcrypt.hash('logistics123', 10), // hashed password
      role: 'LOGISTICS',
      baseId: baseBravo.id
    }
  })

  // Purchases
  await prisma.purchase.createMany({
    data: [
      {
        baseId: baseAlpha.id,
        equipmentTypeId: rifle.id,
        quantity: 100
      },
      {
        baseId: baseBravo.id,
        equipmentTypeId: jeep.id,
        quantity: 10
      }
    ]
  })

  // Transfers
  await prisma.transfer.create({
    data: {
      fromBaseId: baseAlpha.id,
      toBaseId: baseBravo.id,
      equipmentTypeId: rifle.id,
      quantity: 20
    }
  })

  // Assignments
  await prisma.assignment.create({
    data: {
      baseId: baseBravo.id,
      equipmentTypeId: jeep.id,
      assignedTo: 'Personnel_123',
      quantity: 2
    }
  })

  // Expenditures
  await prisma.expenditure.create({
    data: {
      baseId: baseBravo.id,
      equipmentTypeId: rifle.id,
      reason: 'Training usage',
      quantity: 10
    }
  })

  console.log('✅ Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
