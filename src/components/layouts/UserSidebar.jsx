import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const UserSidebar = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleTabChangeEvent = (e) => {
      setCurrentTab(e.detail);
    };

    window.addEventListener('sidebarTabChange', handleTabChangeEvent);
    return () => window.removeEventListener('sidebarTabChange', handleTabChangeEvent);
  }, []);

  const handleTabChange = (tab, path) => {
    setCurrentTab(tab);
    if (path) {
      navigate(path);
    }
  };

  const isActive = (tab) => {
    return currentTab === tab ? "active" : "";
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem("token");
      navigate('/login');
    }
  }

  return (
    <>
      <div className="nav-menu">
        <div className="nav-brand">Budget Buddy</div>
        <ul>
          <li
            className={isActive("dashboard")}
            onClick={() => handleTabChange("dashboard", "/user/dashboard")}
          >
            <i>📊</i> <span>Dashboard</span>
          </li>
          <li
            className={isActive("addTransaction")}
            onClick={() => handleTabChange("addTransaction", "/user/addTransaction")}
          >
            <i>➕</i> <span>Add Transaction</span>
          </li>
          <li
            className={isActive("transactions")}
            onClick={() => handleTabChange("transactions", "/user/transactions")}
          >
            <i>💰</i> <span>Transactions</span>
          </li>
          <li
            className={isActive("reports")}
            onClick={() => handleTabChange("reports", "/user/reports")}
          >
            <i>📝</i> <span>Reports</span>
          </li>
          {/* <li
            className={isActive("categories")}
            onClick={() => handleTabChange("categories")}
          >
            <a href="#">
              <i>🏷️</i> <span>Categories</span>
            </a>
          </li>
          <li
            className={isActive("accounts")}
            onClick={() => handleTabChange("accounts")}
          >
            <a href="#">
              <i>👥</i> <span>Accounts</span>
            </a>
          </li>
<li
            className={isActive("settings")}
            onClick={() => handleTabChange("settings")}
          >
            <a href="#">
              <i>⚙️</i> <span>Settings</span>
            </a>
          </li> */}
          <li
            className={isActive("logout")}
            onClick={() => {
              handleTabChange("logout");
              handleLogout();
            }}
          >
            <i>🚪</i> <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  )
}
