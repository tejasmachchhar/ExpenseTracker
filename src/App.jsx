import { Route, Routes } from 'react-router-dom'
import './App.css'
import './assets/css/appUI.css'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { User } from './components/layouts/User'
import { AddTransaction } from './components/user/AddTransaction'
import axios from 'axios'
import LandingPage from './components/common/LandingPage'
import PrivateRoutes from './assets/hooks/PrivateRoutes'
import { Dashboard } from './components/layouts/Dashboard'
import { Transactions } from './components/layouts/Transactions'
import { Report } from './components/user/Report'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Configure axios defaults
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  
  // Add request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === "ERR_NETWORK") {
        console.error("Network error:", error);
        // Handle network error
      } else if (error.response?.status === 401) {
        // Handle unauthorized error
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
        <div className="app-wrapper">
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="" element={<PrivateRoutes />}>
              <Route path="/user" element={<User />}>
                <Route path='dashboard' element={<Dashboard />}></Route>
                <Route path='addtransaction' element={<AddTransaction />}></Route>
                <Route path='transactions' element={<Transactions/>}></Route>
                <Route path='reports' element={<Report />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
