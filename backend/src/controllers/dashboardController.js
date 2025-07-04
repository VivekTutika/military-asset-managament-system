export const getDashboardStats = async (req, res) => {
  try {
    const baseId = req.query.baseId // Optional filter

    const whereBase = baseId ? { baseId } : {}

    const purchases = await prisma.purchase.groupBy({
      by: ['equipmentTypeId'],
      where: whereBase,
      _sum: { quantity: true }
    })

    const transfersIn = await prisma.transfer.groupBy({
      by: ['equipmentTypeId'],
      where: baseId ? { toBaseId: baseId } : {},
      _sum: { quantity: true }
    })

    const transfersOut = await prisma.transfer.groupBy({
      by: ['equipmentTypeId'],
      where: baseId ? { fromBaseId: baseId } : {},
      _sum: { quantity: true }
    })

    const assignments = await prisma.assignment.groupBy({
      by: ['equipmentTypeId'],
      where: whereBase,
      _sum: { quantity: true }
    })

    const expenditures = await prisma.expenditure.groupBy({
      by: ['equipmentTypeId'],
      where: whereBase,
      _sum: { quantity: true }
    })

    const equipmentTypes = await prisma.equipmentType.findMany()

    const summary = equipmentTypes.map((type) => {
      const eqId = type.id

      const purchaseQty = purchases.find(p => p.equipmentTypeId === eqId)?._sum.quantity || 0
      const transferInQty = transfersIn.find(t => t.equipmentTypeId === eqId)?._sum.quantity || 0
      const transferOutQty = transfersOut.find(t => t.equipmentTypeId === eqId)?._sum.quantity || 0
      const assignedQty = assignments.find(a => a.equipmentTypeId === eqId)?._sum.quantity || 0
      const expendedQty = expenditures.find(e => e.equipmentTypeId === eqId)?._sum.quantity || 0

      const netMovement = purchaseQty + transferInQty - transferOutQty
      const closingBalance = netMovement - assignedQty - expendedQty

      return {
        equipmentType: type.name,
        category: type.category,
        purchaseQty,
        transferInQty,
        transferOutQty,
        assignedQty,
        expendedQty,
        netMovement,
        closingBalance
      }
    })

    res.json(summary)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Dashboard data error' })
  }
}
