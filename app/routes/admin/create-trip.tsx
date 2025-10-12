import Headers from "../../components/Headers";
import React, {useState} from "react";
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns";
import type {Route} from './+types/create-trip'
import {comboBoxItems, selectItems} from "~/constants";
import {cn, formatKey} from "~/lib/utils";
import {LayerDirective, LayersDirective, MapsComponent} from "@syncfusion/ej2-react-maps";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import type {User} from "firebase/auth";
import {auth} from "~/firebase/client";
import { world_map } from "~/constants/world_map";


export const loader = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json();
    return data.map((country:any) => ({
        name: country.flag + country.name.common,
        coordinates: country.latlng,
        value:country.name.common,
        openStreetMap: country.maps?.openStreetMap,
    }));
}
const createTrip = ({loaderData}: Route.ComponentProps) => {
    const countries = loaderData as Country[]

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<TripFormData>({
        country: countries[0]?.name || '',
        travelStyle: '',
        interest:'',
        budget: '',
        duration: 0,
        groupType: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if(
            !formData.country ||
            !formData.travelStyle ||
            !formData.interest ||
            !formData.budget ||
            !formData.groupType
        ) {
            setError("Please fill all fields");
            setLoading(false);
            return;
        }

        if(formData.duration < 1 || formData.duration >  10) {
            setError('Duration must be between 1 and 10 days');
            setLoading(false);
            return;
        }

        const user = await new Promise<User | null>((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(
                user => {
                    unsubscribe();
                    resolve(user);
                },
                reject
            );
        });
        if(!user) {
            console.error("User not authenticated.");
            setLoading(false);
            return;
        }

        try {
            console.log('user', user);
            console.log('formData', formData);
        } catch (e) {

        }
    }
    const handleChange=  (key: keyof TripFormData, value: string |number) => {
        setFormData({...formData, [key]: value})
    }

    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value,
    }))

    const mapData = [
        {
            country: formData.country,
            color: '#EA382E',
            coordinates: countries.find((c: Country) => c.name === formData.country)?.coordinates || [],
        }
    ]

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

                    {selectItems.map((key)=>(
                        <div>

                            <label htmlFor={key}>{formatKey(key)}</label>

                            <ComboBoxComponent
                               id={key}
                               dataSource={comboBoxItems[key].map((item)=>({
                                   text: item,
                                    value: item
                               }))}
                               className='combo-box'
                               fields={{text:'text', value:'value'}}
                               placeholder={`Select ${formatKey(key)}`}
                               change={(e: {value: string | undefined}) => {
                                   if(e.value){
                                       handleChange(key, e.value)
                                   }
                               }}
                               allowFiltering
                               filtering={(e)=>{
                                   const query = e.text.toLowerCase();
                                   e.updateData(comboBoxItems[key].filter((item) => item.toLowerCase().includes(query)).map(((item ) =>({
                                       text: item,
                                       value: item
                                   }))))
                               }}
                            />
                        </div>
                        ))}

                    <div>
                        <label htmlFor='location'>
                            Location on the world map
                        </label>

                        <MapsComponent>
                            <LayersDirective>
                                <LayerDirective
                                    shapeData={world_map}
                                  dataSource={mapData}
                                  shapePropertyPath='name'
                                  shapeDataPath='country'
                                  shapeSettings={{colorValuePath:'color', fill:'#e5e5e5'}}
                                />
                            </LayersDirective>
                        </MapsComponent>
                    </div>

                    <div className='bg-gray-200 h-px w-full' />
                    {error && (
                        <div className='error'>
                            <p>
                                {error}
                            </p>

                        </div>
                    )}

                    <footer>
                        <ButtonComponent
                            type='submit'
                            disabled={loading}
                        >
                            <img
                                src={`/public/icons/${loading ? 'loader.svg': 'magic-star.svg'}`}
                                alt='Generate Trip'
                                className={cn('size-5', {'animate-spin': loading})}
                            />

                            <span className='p-16-semibold text-white'>
                                {loading ? 'Generating...': 'Generate Trip'}
                            </span>
                        </ButtonComponent>
                    </footer>
                </form>

            </section>
        </main>
    )
}

export default createTrip