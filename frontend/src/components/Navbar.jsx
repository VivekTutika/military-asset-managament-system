import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex gap-6 items-center">
        <Link to="/" className="font-bold text-lg hover:underline">Dashboard</Link>
        <Link to="/purchases" className="hover:underline">Purchases</Link>
        <Link to="/transfers" className="hover:underline">Transfers</Link>
        <Link to="/assignments" className="hover:underline">Assignments</Link>
        <Link to="/expenditures" className="hover:underline">Expenditures</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm italic">Logged in as: {user.email} ({user.role})</span>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
