import Headers from "../../components/Headers";
import React from "react";

const Trips = () => {
    return (
        <main className='all-users wrapper'>
            <Headers
                title='Trips'
                description='View and edit AI-generated travel plans'
                ctaText='Create a trip'
                ctaUrl='/trips/create'
            />
        </main>
    )
}

export default Trips