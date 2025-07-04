import React, { useEffect, useState } from 'react'
import api from '../services/api'
import MetricCard from '../components/MetricCard'

export default function Dashboard() {
  const [data, setData] = useState([])
  const [filters, setFilters] = useState({
    baseId: '',
    equipmentTypeId: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard', { params: filters })
        setData(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchStats()
  }, [filters])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Summary</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          className="border rounded px-2 py-1"
          type="text"
          placeholder="Base ID"
          value={filters.baseId}
          onChange={e => setFilters(f => ({ ...f, baseId: e.target.value }))}
        />
        <input
          className="border rounded px-2 py-1"
          type="text"
          placeholder="Equipment Type ID"
          value={filters.equipmentTypeId}
          onChange={e => setFilters(f => ({ ...f, equipmentTypeId: e.target.value }))}
        />
        <input
          className="border rounded px-2 py-1"
          type="date"
          value={filters.startDate}
          onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))}
        />
        <input
          className="border rounded px-2 py-1"
          type="date"
          value={filters.endDate}
          onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={() => {}} // No-op, filters are reactive
        >
          Apply Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <MetricCard key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

