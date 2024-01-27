import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AdminPrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.userAuth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (user.userRole === "super admin") {
    return children
  } else {
    return <Navigate to="/app" />
  }
}

export default AdminPrivateRoute
