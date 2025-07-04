import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import PrivateRoute from './routes/PrivateRoute'

import Dashboard from './pages/Dashboard'
import Purchases from './pages/Purchases'
import Transfers from './pages/Transfers'
import Assignments from './pages/Assignments'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Expenditures from './pages/Expenditures'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Layout from './components/Layout'

// Helper to wrap routes with Layout and Auth
function AppRoutes() {
  const { user, logout } = useAuth()
  return (
    <Layout user={user} onLogout={logout}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/purchases"
          element={
            <PrivateRoute>
              <Purchases />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfers"
          element={
            <PrivateRoute>
              <Transfers />
            </PrivateRoute>
          }
        />
        <Route
          path="/assignments"
          element={
            <PrivateRoute>
              <Assignments />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenditures"
          element={
            <PrivateRoute>
              <Expenditures />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
