import React from 'react'
import { UserNavbar } from './UserNavbar'
import { UserSidebar } from './UserSidebar'
import { Outlet } from 'react-router-dom'

export const User = () => {
  return (
    <>
        <UserNavbar></UserNavbar>
        <UserSidebar></UserSidebar>
        <main className="app-main">
            <Outlet></Outlet>
        </main>

    </>
  )
}
