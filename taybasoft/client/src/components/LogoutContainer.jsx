import React, { useState } from "react"
import { FaCaretDown, FaUserCircle } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/LogoutContainer"
import { useDashboardContext } from "../pages/DashboardLayout"
import { useLogoutMutation } from "../slices/auth/authApiSlice"
import { clearUserAuth } from "../slices/users/userAuthSlice"
import { toastHandler } from "../utils/toastHandler"

const LogoutContainer = () => {
  const dispatch = useDispatch()
  const [showLogout, setShowLogout] = useState(false)
  const { user } = useDashboardContext()

  const navigate = useNavigate()
  const [logout, { isLoading }] = useLogoutMutation()

  const logoutUser = async () => {
    try {
      const result = await logout().unwrap()
      // clear userAuth state
      dispatch(clearUserAuth())
      // remove userInfo from localStorage
      localStorage.removeItem("userInfo")
      toastHandler(result, "success")
      navigate("/login")
    } catch (err) {
      toastHandler(err, "error")
    }
  }
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => {
          setShowLogout(!showLogout)
        }}
      >
        <FaUserCircle />
        {user.fullName}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser} disabled={isLoading}>
          {isLoading ? 'deconnexion en cours' : 'se déconnecter'}
        </button>
      </div>
    </Wrapper>
  )
}

export default LogoutContainer
