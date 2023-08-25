import React from 'react'
import { Outlet } from "react-router-dom";
import AdminSidebar from './admin-sidebar';
const AdminLayout = () => {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <div className='flex justify-center items-center w-full'>

        <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout