import React from 'react'
import Sidebar from '../sidebar'
import './dashboard.css'

function DashboardLayout({ children, route }): JSX.Element {

    return (
        <div className='dashboard-container'>
            <Sidebar item={route} />
            {children}
        </div>
    )
}

export default DashboardLayout