import React from "react";
import { Outlet } from "react-router";

const Admin_Layout = () => {
    return (
        <div className="admin-layout">
           Mobile Sidebar 
           <aside className="w-full max-w-[270px] hidden lg:block">
            
           </aside>
           <aside className="children">
                <Outlet />
           </aside>
        </div>
    )
}

export default Admin_Layout