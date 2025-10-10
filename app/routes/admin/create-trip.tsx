import Headers from "../../components/Headers";
import React from "react";
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns";
import type {Route} from './+types/create-trip'

export const loader = async () => {
    //const response = await fetch('https://restcountries.com/v3.1/all')
    const data = [
        {
            name: 'Ghana',
            latlng: '123123',

        }
    ]//await response.json();
    return data.map((country:any) => ({
        name: country.flag + country.name.common,
        coordinates: country.latlng,
        value:country.name.common,
        openStreetMap: country.maps?.openStreetMap,
    }));
}
const createTrip = ({loaderData}: Route.ComponentProps) => {
    const handleSubmit = async () => {}
    const handleChange=  (keys: keyof TripFormData, value: string |number) => {}
    const countries = loaderData as Country[]
    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value,
    }))
    console.log(countries)

    return (
        <main className='flex flex-col gap-10 pb-20 wrapper'>
            <Headers
                title='Add New Trips'
                description='View and edit AI-generated travel plans'
            />

            <section className=' mt-2.5 wrapper-md'>
                <form className='trip-form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='country'>
                            Country
                        </label>
                        <ComboBoxComponent
                            id='country'
                            dataSource={countryData ?? ['title1', 'title2']}
                            fields={{text:'text', value:'value'}}
                            placeholder='Select Country'
                            className='combo-box'
                            change={(e: {value: string | undefined}) => {
                                if(e.value){
                                    handleChange('country', e.value)
                                }
                            }}
                            allowFiltering
                            filtering={(e)=>{
                                const query = e.text.toLowerCase();
                                e.updateData(countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) =>({
                                    text: country.name,
                                    value: country.value
                                }))))
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor='duration'>
                            Duration
                        </label>
                        <input
                            id='duration'
                            name='duration'
                            placeholder='Enter a number of days (1, 5, 12 ..)'
                            className='form-input placeholder:text-gray-100'
                            onChange={(e)=> handleChange('duration', Number(e.target.value))}
                        />
                    </div>
                </form>

            </section>
        </main>
    )
}

export default createTrip