import { useEffect, useState } from 'react'
import API from '../services/api'

const Transfers = () => {
  const [fromBaseId, setFromBaseId] = useState('')
  const [toBaseId, setToBaseId] = useState('')
  const [equipmentTypeId, setEquipmentTypeId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [transfers, setTransfers] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/transfers', {
        fromBaseId: parseInt(fromBaseId, 10),
        toBaseId: parseInt(toBaseId, 10),
        equipmentTypeId: parseInt(equipmentTypeId, 10),
        quantity: parseInt(quantity, 10)
      })
      setEquipmentTypeId('')
      setQuantity('')
      fetchTransfers()
    } catch (err) {
      console.error('Failed to record transfer')
    }
  }

  const fetchTransfers = async () => {
    try {
      const res = await API.get(`/transfers?fromBaseId=${fromBaseId}`)
      setTransfers(res.data)
    } catch (err) {
      console.error('Failed to fetch transfers')
    }
  }

  useEffect(() => {
    if (fromBaseId) fetchTransfers()
  }, [fromBaseId])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asset Transfers</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input type="text" value={fromBaseId} onChange={(e) => setFromBaseId(e.target.value)} placeholder="From Base ID" className="border rounded px-3 py-2" required />
        <input type="text" value={toBaseId} onChange={(e) => setToBaseId(e.target.value)} placeholder="To Base ID" className="border rounded px-3 py-2" required />
        <input type="text" value={equipmentTypeId} onChange={(e) => setEquipmentTypeId(e.target.value)} placeholder="Equipment Type" className="border rounded px-3 py-2" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="border rounded px-3 py-2" required />
        <button type="submit" className="col-span-1 md:col-span-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">Transfer</button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">From</th>
            <th className="p-2 text-left">To</th>
            <th className="p-2 text-left">Equipment</th>
            <th className="p-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{item.fromBase.name}</td>
              <td className="p-2">{item.toBase.name}</td>
              <td className="p-2">{item.equipmentType}</td>
              <td className="p-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transfers
