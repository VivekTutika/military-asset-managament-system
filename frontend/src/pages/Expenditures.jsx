import { useState } from 'react'
import api from '../services/api'

export default function Expenditures() {
  const [baseId, setBaseId] = useState('')
  const [equipmentTypeId, setEquipmentTypeId] = useState('')
  const [reason, setReason] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/assignments/expend', {
        baseId: parseInt(baseId, 10),
        equipmentTypeId: parseInt(equipmentTypeId, 10),
        reason,
        quantity: parseInt(quantity, 10)
      })
      alert('Expenditure recorded successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to record expenditure')
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Record Asset Expenditure</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input
          type="text"
          placeholder="Base ID"
          value={baseId}
          onChange={e => setBaseId(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Equipment Type ID"
          value={equipmentTypeId}
          onChange={e => setEquipmentTypeId(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Reason for expenditure"
          value={reason}
          onChange={e => setReason(e.target.value)}
          className="input"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="input"
          min="1"
          required
        />
        <button type="submit" className="btn">
          Submit Expenditure
        </button>
      </form>
    </div>
  )
}
