import React from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Header from '../../component/header/Header'

function safeParseJwt(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
    return decoded
  } catch (err) {
    return null
  }
}

const PrivateRoute = ({ children }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) return <Navigate to="/login" replace />

  const payload = safeParseJwt(token)
  if (!payload || payload.role !== 'admin') {
    // not admin - clear token and redirect
    localStorage.removeItem('token')
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  )
}

export default PrivateRoute
