import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './assets/css/appUI.css'
// import './assets/css/UI_Dashboard_AddExpense_Chart.css'
// import "./assets/css/adminlte.css"
// import "./assets/css/adminlte.min.css"
// import './assets/css/bootstrap.min.css'
// import './assets/css/bootstrap.css'
import { UserDashboard } from './components/user/UserDashboard'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { User } from './components/layouts/User'
import { AddTransaction } from './components/user/AddTransaction'
import axios from 'axios'
import LandingPage from './components/common/LandingPage'
import PrivateRoutes from './assets/hooks/PrivateRoutes'
import { Dashboard } from './components/layouts/Dashboard'
import { AddExpenseAI } from './components/user/AddExpenseAI'
import { Transactions } from './components/layouts/Transactions'
import { Report } from './components/user/Report';

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <>
      <div className="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
        <div className="app-wrapper">
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="" element={<PrivateRoutes />}>
              <Route path="/user" element={<User />}>
                <Route path='dashboard' element={<Dashboard />}></Route>
                {/* <Route path='dashboard' element={<UserDashboard/>}></Route> */}
                <Route path='addtransaction' element={<AddTransaction />}></Route>
                <Route path='addexpense' element={<AddExpenseAI />}></Route>
                <Route path='transactions' element={<Transactions/>}></Route>
                <Route path="/user/reports" element={<Report />} />
              </Route>
              {/* <Route path="/*" element={<User/>}></Route> // This is the default route */}
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
