import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProfilePopup({ user, onLogout, onClose, anchorRef }) {
  // Close popup if clicked outside
  const popupRef = useRef(null)
  useEffect(() => {
    function handleClick(e) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose, anchorRef])

  if (!user) return null
  return (
    <div
      ref={popupRef}
      className="absolute right-4 top-16 bg-white shadow-2xl rounded-2xl p-6 w-80 border-4 border-black z-50"
      style={{ minWidth: '18rem' }}
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 text-blue-700 rounded-full h-14 w-14 flex items-center justify-center text-2xl font-bold mr-3">
          {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <div>
          <span className="font-semibold text-gray-700">Role:</span>
          <span className="ml-2 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs uppercase">
            {user.role}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Base ID:</span>
          <span className="ml-2">{user.baseId}</span>
        </div>
      </div>
      <button
        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition font-semibold"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default function Layout({ children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()
  const profileBtnRef = useRef(null)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center bg-blue-700 text-white h-14 px-4 shadow">
        {user && (
          <button
            className="text-2xl mr-4 md:hidden block"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        )}
        <div className="flex-1 flex justify-center">
          <span className="font-bold text-lg text-center">
            Welcome to Military Asset Management System🪖
          </span>
        </div>
        {user && (
          <button
            ref={profileBtnRef}
            className="ml-4 bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold border-2 border-blue-300 hover:border-blue-500 transition"
            onClick={() => setProfileOpen((v) => !v)}
            aria-label="Open profile"
            type="button"
          >
            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
          </button>
        )}
        {/* Profile Popup (absolutely positioned) */}
        {user && profileOpen && (
          <ProfilePopup
            user={user}
            onLogout={onLogout}
            onClose={() => setProfileOpen(false)}
            anchorRef={profileBtnRef}
          />
        )}
      </nav>
      {/* Main Content */}
      <div className="flex flex-1 min-h-0 pt-14">
        {/* Sidebar */}
        {user && (
          <>
            {/* Desktop sidebar */}
            <aside
              className={`bg-gray-100 border-r border-gray-200 flex-col gap-2 py-6 px-2 w-56
                md:flex hidden fixed md:static z-20 h-full md:h-auto`}
            >
              <Link
                to="/dashboard"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/dashboard' ? 'bg-blue-200 font-semibold' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/purchases"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/purchases' ? 'bg-blue-200 font-semibold' : ''
                }`}
              >
                Purchases
              </Link>
              <Link
                to="/transfers"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/transfers' ? 'bg-blue-200 font-semibold' : ''
                }`}
              >
                Transfers
              </Link>
              <Link
                to="/assignments"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/assignments' ? 'bg-blue-200 font-semibold' : ''
                }`}
              >
                Assignments
              </Link>
            </aside>
            {/* Mobile sidebar */}
            <aside
              className={`bg-gray-100 border-r border-gray-200 flex-col gap-2 py-6 px-2 w-56
                fixed z-30 h-full top-14 left-0 transition-transform duration-200 md:hidden
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
              <Link
                to="/dashboard"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/dashboard' ? 'bg-blue-200 font-semibold' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/purchases"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/purchases' ? 'bg-blue-200 font-semibold' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                Purchases
              </Link>
              <Link
                to="/transfers"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/transfers' ? 'bg-blue-200 font-semibold' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                Transfers
              </Link>
              <Link
                to="/assignments"
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  location.pathname === '/assignments' ? 'bg-blue-200 font-semibold' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                Assignments
              </Link>
            </aside>
            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        )}
        {/* Page Content */}
        <main className={`flex-1 p-6 ${user ? 'md:ml-56' : ''}`}>{children}</main>
      </div>
    </div>
  )
}