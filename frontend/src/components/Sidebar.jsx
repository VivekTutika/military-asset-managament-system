import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Purchases', path: '/purchases' },
  { name: 'Transfers', path: '/transfers' },
  { name: 'Assignments', path: '/assignments' },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="w-64 bg-gray-100 h-screen shadow-md fixed top-0 left-0 pt-16">
      <nav className="flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              location.pathname === item.path
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
