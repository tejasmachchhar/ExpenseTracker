import React from 'react'
import { UserSidebar } from './UserSidebar'
import { Outlet } from 'react-router-dom'

export const User = () => {
  return (
    <div 
    >
        {/* <UserNavbar></UserNavbar> */}
        <UserSidebar
        ></UserSidebar>
        {/* <UserNavbar></UserNavbar> */}
        <main 
        >
            <Outlet></Outlet>
        </main>
    </div>
  )
}
