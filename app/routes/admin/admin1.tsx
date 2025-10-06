import React from "react";
import Headers from "~/components/Headers";
import TripCard from "~/components/TripCard";
import StatsCard from "~/components/StatsCard";
import {dashboardStats, user, allTrips} from "~/constants";
import {fetchUserProfile} from "~/firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "~/firebase/client";

const Dashboard = () => {

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

            <section className='contaier'>
                <h1 className='text-xl font-semibold text-dark-100'>
                    Created Trips
                </h1>

                <div className='trip-grid'>
                    {allTrips.slice(0,4).map(({id, name, imageUrl, itinerary, tags, travelStyle, estimatedPrice}) => (
                        <TripCard
                            key={id}
                            id={id.toString()}
                            name={name}
                            imageUrl={imageUrl}
                            location={itinerary?.[0]?.location ?? ''}
                            tags={tags}
                            price={estimatedPrice}

                        />
                    ))}
                </div>
            </section>

        </main>
    )
}

export default Dashboard;