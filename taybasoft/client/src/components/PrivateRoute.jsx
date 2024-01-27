import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.userAuth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (user.userRole !== "super admin") {
    return children
  } else {
    return <Navigate to="/admin" />
  }

}

export default PrivateRoute
