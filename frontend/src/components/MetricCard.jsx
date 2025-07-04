import React from 'react'

export default function MetricCard({ item }) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-2">{item.equipmentType}</h3>
      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
      <ul className="text-sm space-y-1">
        <li>🛒 Purchases: {item.purchaseQty}</li>
        <li>🔄 Transfer In: {item.transferInQty}</li>
        <li>🔁 Transfer Out: {item.transferOutQty}</li>
        <li>🎯 Assigned: {item.assignedQty}</li>
        <li>💥 Expended: {item.expendedQty}</li>
        <li>➕ Net Movement: {item.netMovement}</li>
        <li>📦 Closing Balance: {item.closingBalance}</li>
      </ul>
    </div>
  )
}
