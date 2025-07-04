import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', baseId: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await register(form.name, form.email, form.password, form.role, parseInt(form.baseId, 10))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <input className="block w-full mb-2 border rounded px-3 py-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input className="block w-full mb-2 border rounded px-3 py-2" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className="block w-full mb-2 border rounded px-3 py-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input className="block w-full mb-2 border rounded px-3 py-2" name="role" placeholder="Role (admin, base_commander, logistics)" value={form.role} onChange={handleChange} required />
      <input className="block w-full mb-4 border rounded px-3 py-2" name="baseId" type="number" placeholder="Base ID" value={form.baseId} onChange={handleChange} required />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">Register</button>
    </form>
  )
}