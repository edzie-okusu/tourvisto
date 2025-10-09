import React from "react";
import {Outlet, redirect} from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import {MobileSidebar, NavItems} from "~/components";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "~/firebase/client";

export async function clientLoader() {
    try {
        const unsubscribe =  onAuthStateChanged(auth,(user) => {
            if (!user) {
                redirect('/sign-in')
            }
            return user;

        })

        return() => unsubscribe;
    } catch (e) {
        console.log('Error fetching user', e)
    }
}

const Admin_Layout = async () => {
    await clientLoader();
    return (
        <div className="admin-layout">
           <MobileSidebar />

           <aside className="w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>

           </aside>
           <aside className="children">
                <Outlet />
           </aside>
        </div>
    )
}

export default Admin_Layout