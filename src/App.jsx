import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
// import './App.css'
import "./assets/css/adminlte.css"
import "./assets/css/adminlte.min.css"
import { UserSidebar } from './components/layouts/UserSidebar'
import { UserNavbar } from './components/layouts/UserNavbar'
import { UserDashboard } from './components/user/UserDashboard'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'

function App() {
  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
      <div className="app-wrapper">
        <Routes>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/signup' element = {<Signup/>}></Route>
          <Route path="/user" element={<UserSidebar/>}>
            <Route path='dashboard' element={<UserDashboard/>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
