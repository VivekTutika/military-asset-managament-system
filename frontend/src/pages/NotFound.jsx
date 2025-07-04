import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page not found. You might be lost in the desert 🏜️</p>
      <Link
        to="/"
        className="text-blue-500 underline hover:text-blue-700 transition-all"
      >
        Head back to Base 🪖
      </Link>
    </div>
  )
}

export default NotFound
