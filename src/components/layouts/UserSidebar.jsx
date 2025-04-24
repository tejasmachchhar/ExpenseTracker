import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../assets/css/UserSidebar.css'

export const UserSidebar = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Handle custom event for tab changes
    const handleTabChangeEvent = (e) => {
      setCurrentTab(e.detail);
    };

    // Sync active tab with current URL path on mount and URL changes
    const path = location.pathname;
    if (path.includes('/user/dashboard')) {
      setCurrentTab('dashboard');
    } else if (path.includes('/user/addtransaction')) {
      setCurrentTab('addTransaction');
    } else if (path.includes('/user/transactions')) {
      setCurrentTab('transactions');
    } else if (path.includes('/user/reports')) {
      setCurrentTab('reports');
    }

    window.addEventListener('sidebarTabChange', handleTabChangeEvent);
    return () => window.removeEventListener('sidebarTabChange', handleTabChangeEvent);
  }, [location.pathname]); // Re-run when path changes

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
      <div className="sidebar-navigation">
        <div className="sidebar-brand">Budget Buddy</div>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${isActive("dashboard")}`}
            onClick={() => handleTabChange("dashboard", "/user/dashboard")}
          >
            <i>📊</i> <span>Dashboard</span>
          </li>
          <li
            className={`sidebar-menu-item ${isActive("addTransaction")}`}
            onClick={() => handleTabChange("addTransaction", "/user/addtransaction")}
          >
            <i>➕</i> <span>Add Transaction</span>
          </li>
          <li
            className={`sidebar-menu-item ${isActive("transactions")}`}
            onClick={() => handleTabChange("transactions", "/user/transactions")}
          >
            <i>💰</i> <span>Transactions</span>
          </li>
          <li
            className={`sidebar-menu-item ${isActive("reports")}`}
            onClick={() => handleTabChange("reports", "/user/reports")}
          >
            <i>📝</i> <span>Reports</span>
          </li>
          <li
            className={`sidebar-menu-item ${isActive("logout")}`}
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
