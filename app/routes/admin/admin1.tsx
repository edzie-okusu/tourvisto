import React from "react";
import Headers from "~/components/Headers";

const Dashboard = () => {
    const user = {
        name: 'Kwame',
        email: 'contact@elletech.pro',
        imageUrl: 'public/images/david.webp',
    }

    return (
        <main className='dashboard wrapper'>
            <Headers
                title={`Welcome ${user?.name ?? 'Guest'}`}
                description='Track Users, Trends and popular destinations in real time'
            />

            Dashboard Page Contents
        </main>
    )
}

export default Dashboard;