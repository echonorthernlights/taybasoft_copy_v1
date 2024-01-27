import React, { createContext, useContext, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Wrapper from "../assets/wrappers/main"
import { BigSidebar, NavBar, SmallSidebar } from "../components"
const DashboardContext = createContext()

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = useSelector((state) => state.userAuth.user)
  const memoizedUser = useMemo(() => user, [user])
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <DashboardContext.Provider
      value={{
        user: memoizedUser,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className="main">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="main-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
