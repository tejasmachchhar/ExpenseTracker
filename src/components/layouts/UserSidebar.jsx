import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const UserSidebar = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };
  const isActive = (tab) => {
    return currentTab === tab ? "active" : "";
  }
  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };
  return (
    <>
      <div className="nav-menu">
        <div className="nav-brand">Budget Buddy</div>
        <ul>
          <li 
            className={isActive("dashboard")}
            onClick={() => handleTabChange("dashboard")}
            >
            <Link to="/user/dashboard">
              <i>📊</i> <span>Dashboard</span>
            </Link>
          </li>
          <li 
            className={isActive("addTransaction")}
            onClick={() => handleTabChange("addTransaction")}
          >
            <Link to="/user/addTransaction">
              <i>✍️</i> <span>Add Transaction</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <i>💰</i> <span>Expenses</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i>📝</i> <span>Reports</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i>🏷️</i> <span>Categories</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i>👥</i> <span>Team</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i>⚙️</i> <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
