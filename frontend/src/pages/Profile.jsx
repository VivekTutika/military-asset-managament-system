import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  if (!user) return <div className="flex justify-center items-center h-96">Loading...</div>
  return (
    <div className="w-full h-full flex justify-center items-start bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-4 border-black mt-16">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 text-blue-700 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mr-4">
            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="space-y-2 mb-8">
          <div>
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="ml-2 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs uppercase">{user.role}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Base ID:</span>
            <span className="ml-2">{user.baseId}</span>
          </div>
        </div>
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition font-semibold"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}