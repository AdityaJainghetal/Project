import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
    <div style={{backgroundColor:"whitesmoke"}}>
    <Sidebar/>
    <Outlet/>
    </div>
    </>
  )
}

export default Dashboard