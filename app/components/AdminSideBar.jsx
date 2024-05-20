"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminSideBar = ({logoutHandler}) => {
    const router = useRouter();
    const navigateTo = (plex) => {
        router.push(plex)
    }
  return (
    <nav className="h-[100vh] bg-gray-800 fixed text-white p-4 gap-y-16 flex flex-col items-center text-center" >
    <div className="mb-4 cursor-pointer  flex flex-col items-center " onClick={() => navigateTo('/admin')}>
      <FaHome size={35} />
      <span className="mt-1 text-xs">Profile</span>
    </div>
    <div className="mb-4 cursor-pointer flex flex-col items-center" onClick={() => navigateTo('/admin/profile')}>
      <FaUser size={35} />
      <span className="mt-1 text-xs">Profile</span>
    </div>
    <div className="mb-4 cursor-pointer flex flex-col items-center" onClick={() => navigateTo('/admin/settings')}>
      <FaCog size={35} />
      <span className="mt-1 text-xs">Settings</span>
    </div>
    <div className="cursor-pointer flex flex-col items-center" onClick={logoutHandler}>
      <FaSignOutAlt size={35} />
      <span className="mt-1 text-xs">Logout</span>
    </div>
  </nav>
  )
}

export default AdminSideBar