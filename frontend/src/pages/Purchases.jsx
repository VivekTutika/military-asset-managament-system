import { useEffect, useState } from 'react'
import API from '../services/api'

const Purchases = () => {
  const [equipmentTypeId, setEquipmentTypeId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [baseId, setBaseId] = useState('')
  const [purchases, setPurchases] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/purchases', {
        baseId: parseInt(baseId, 10),
        equipmentTypeId: parseInt(equipmentTypeId, 10),
        quantity: parseInt(quantity, 10)
      })
      setEquipmentTypeId('')
      setQuantity('')
      fetchPurchases()
    } catch (err) {
      console.error('Failed to record purchase')
    }
  }

  const fetchPurchases = async () => {
    try {
      const res = await API.get(`/purchases?baseId=${baseId}`)
      setPurchases(res.data)
    } catch (err) {
      console.error('Failed to fetch purchases')
    }
  }

  useEffect(() => {
    if (baseId) fetchPurchases()
  }, [baseId])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asset Purchases</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
          placeholder="Base ID"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          value={equipmentTypeId}
          onChange={(e) => setEquipmentTypeId(e.target.value)}
          placeholder="Equipment Type"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="border rounded px-3 py-2"
          required
        />
        <button type="submit" className="col-span-1 md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
          Add Purchase
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Equipment</th>
            <th className="p-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{item.equipmentType}</td>
              <td className="p-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Purchases
