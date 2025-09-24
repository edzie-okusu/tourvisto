import React from "react";
import Headers from "~/components/Headers";
import TripCard from "~/components/TripCard";
import StatsCard from "~/components/StatsCard";

const Dashboard = () => {
    const user = {
        name: 'Kwame',
        email: 'contact@elletech.pro',
        imageUrl: 'public/images/david.webp',
    }

    const dashboardStats = {
        totalUsers: 0,
        usersJoined: {
            currentMonth: 0,
            previousMonth: 0
        },
        totalTrips: 0,
        tripsCreated: {
            currentMonth: 0,
            previousMonth: 0
        },
        userRole: {
            total: 0,
            currentMonth: 0,
            previousMonth: 0
        }
    }

    const {totalUsers, userRole, usersJoined,tripsCreated, totalTrips} = dashboardStats;

    return (
        <main className='dashboard wrapper'>
            <Headers
                title={`Welcome ${user?.name ?? 'Guest'}`}
                description='Track Users, Trends and popular destinations in real time'
            />
            <section className='flex flex-col gap-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <StatsCard
                            headerTitle='Total Users'
                            total={totalUsers}
                            currentMonthCount={usersJoined.currentMonth}
                            lastMonthCount={usersJoined.previousMonth}
                        />

                        <StatsCard
                            headerTitle='Total Trip'
                            total={totalTrips}
                            currentMonthCount={tripsCreated.currentMonth}
                            lastMonthCount={tripsCreated.previousMonth}
                        />

                        <StatsCard
                            headerTitle='Active Users'
                            total={userRole.total}
                            currentMonthCount={userRole.currentMonth}
                            lastMonthCount={userRole.previousMonth}
                        />
                </div>
            </section>
        </main>
    )
}

export default Dashboard;