import React from 'react'
import { UserNavbar } from './UserNavbar'
import { UserSidebar } from './UserSidebar'
import { Outlet } from 'react-router-dom'

export const User = () => {
  return (
    <div 
    >
        {/* <UserNavbar></UserNavbar> */}
        <UserSidebar
        ></UserSidebar>
        <main 
        >
            <Outlet></Outlet>
        </main>
    </div>
  )
}
