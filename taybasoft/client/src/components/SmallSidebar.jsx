import React from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import getLinks from "../utils/links";
import Logo from "./Logo";
const SmallSidebar = () => {
  const { showSidebar, toggleSidebar, user } = useDashboardContext();
  const links = getLinks(user.userRole)

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container "
        }
      >
        <div className="content">
          <button type="buttom" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link) => {
              const { path, icon, text } = link;
              return (
                <NavLink
                  to={path}
                  key={text}
                  className="nav-link"
                  onClick={toggleSidebar}
                  end
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
