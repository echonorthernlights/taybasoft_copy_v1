import React from "react"
import DashboardLineChart from "../components/charts/DashboardLineChart"
import DashboardPieChart from "../components/charts/DashboardPieChart"
import DashboardBarChart from "../components/charts/DahboardBarChart"
import DashboardAreaChart from "../components/charts/DashboardAreaChart"
import Wrapper from "../assets/wrappers/CardsPageContainer"
import DashboardRadarChart from "../components/charts/DashboardRadarChart"
const Dashboard = () => {
  return (
    <Wrapper style={{ position: "relative", zIndex: -5 }}>
      <div
        className="cards-container"
        style={{
          marginBottom: "5rem",
          marginTop: "2rem",
          position: "abaolute",
        }}
      >
        <DashboardLineChart />
        <DashboardAreaChart />
      </div>
      <div className="cards-container">
        <DashboardBarChart />
        <DashboardLineChart />
      </div>
    </Wrapper>
  )
}

export default Dashboard
