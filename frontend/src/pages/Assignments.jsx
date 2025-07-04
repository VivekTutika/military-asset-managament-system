import { useEffect, useState } from 'react'
import API from '../services/api'

const Assignments = () => {
  const [baseId, setBaseId] = useState('')
  const [personnelId, setPersonnelId] = useState('')
  const [equipmentType, setEquipmentType] = useState('')
  const [assignedQty, setAssignedQty] = useState('')
  const [expendedQty, setExpendedQty] = useState('')
  const [logs, setLogs] = useState([])

  const handleAssign = async (e) => {
    e.preventDefault()
    try {
      await API.post('/assignments/assign', {
        baseId: parseInt(baseId, 10),
        equipmentTypeId: parseInt(equipmentType, 10),
        assignedTo: personnelId, // if this is an ID, parse as needed
        quantity: parseInt(assignedQty, 10),
      })
      setAssignedQty('')
      fetchLogs()
    } catch (err) {
      console.error('Assignment failed', err)
    }
  }

  const handleExpend = async (e) => {
    e.preventDefault()
    try {
      await API.post('/expenditures', {
        baseId,
        personnelId,
        equipmentType,
        quantity: parseInt(expendedQty),
      })
      setExpendedQty('')
      fetchLogs()
    } catch (err) {
      console.error('Expenditure failed', err)
    }
  }

  const fetchLogs = async () => {
    try {
      const res = await API.get(`/assignments/logs?baseId=${baseId}`)
      setLogs(res.data)
    } catch (err) {
      console.error('Failed to fetch logs', err)
    }
  }

  useEffect(() => {
    if (baseId) fetchLogs()
  }, [baseId])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assignments & Expenditures</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <form onSubmit={handleAssign} className="space-y-4">
          <h2 className="text-xl font-semibold">Assign Asset</h2>
          <input type="text" value={baseId} onChange={(e) => setBaseId(e.target.value)} placeholder="Base ID" className="w-full border px-3 py-2 rounded" required />
          <input type="text" value={personnelId} onChange={(e) => setPersonnelId(e.target.value)} placeholder="Personnel ID" className="w-full border px-3 py-2 rounded" required />
          <input type="text" value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} placeholder="Equipment Type" className="w-full border px-3 py-2 rounded" required />
          <input type="number" value={assignedQty} onChange={(e) => setAssignedQty(e.target.value)} placeholder="Quantity" className="w-full border px-3 py-2 rounded" required />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Assign</button>
        </form>

        <form onSubmit={handleExpend} className="space-y-4">
          <h2 className="text-xl font-semibold">Expend Asset</h2>
          <input type="text" value={baseId} onChange={(e) => setBaseId(e.target.value)} placeholder="Base ID" className="w-full border px-3 py-2 rounded" required />
          <input type="text" value={personnelId} onChange={(e) => setPersonnelId(e.target.value)} placeholder="Personnel ID" className="w-full border px-3 py-2 rounded" required />
          <input type="text" value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} placeholder="Equipment Type" className="w-full border px-3 py-2 rounded" required />
          <input type="number" value={expendedQty} onChange={(e) => setExpendedQty(e.target.value)} placeholder="Quantity" className="w-full border px-3 py-2 rounded" required />
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Expend</button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Logs</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Personnel</th>
            <th className="p-2 text-left">Equipment</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="p-2">{new Date(log.createdAt).toLocaleString()}</td>
              <td className="p-2">{log.personnelId}</td>
              <td className="p-2">{log.equipmentType}</td>
              <td className="p-2 capitalize">{log.type}</td>
              <td className="p-2">{log.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Assignments
