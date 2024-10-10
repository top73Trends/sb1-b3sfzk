import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  role: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (userRole !== role) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute