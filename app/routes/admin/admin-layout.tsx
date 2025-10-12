import React from "react";
import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSidebar, NavItems } from "~/components";
import { auth, db } from "~/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import {getAdminData, getAllUsers} from "~/firebase/auth";

export async function clientLoader() {
    const user = await new Promise<User | null>((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
            user => {
                unsubscribe();
                resolve(user);
            },
            reject
        );
    });

    if (!user) {
        return redirect('/sign-in');
    }

    // CRITICAL FIX: Only check for admin existence. DO NOT fetch any user data here.
    const adminDocRef = doc(db, 'admins', user.uid);
    const adminSnapshot = await getDoc(adminDocRef);

    if (!adminSnapshot.exists()) {
        // If the user is not in the 'admins' collection, redirect to the home page.
        return redirect('/');
    }

    // If the user is an admin, return null and let child routes render.
    // Child routes are responsible for fetching their own data.
    const adminData = await getAdminData(user.uid);
    const allUsers = await  getAllUsers();
    return { user: adminData, allUsers }
}
const Admin_Layout = () => {
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

export default Admin_Layout;
