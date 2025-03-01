import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
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

function App() {

  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
      <div className="app-wrapper">
        <Routes>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/signup' element = {<Signup/>}></Route>
          <Route path="/user" element={<User/>}>
            <Route path='dashboard' element={<UserDashboard/>}></Route>
            <Route path='addtransaction' element={<AddTransaction/>}></Route>
          </Route>
          {/* <Route path="/*" element={<User/>}></Route> // This is the default route */}
        </Routes>
      </div>
    </div>
  )
}

export default App
