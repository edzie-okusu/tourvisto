import React from "react";
import Headers from "../../components/Headers";
import {ColumnDirective, ColumnsDirective, GridComponent} from "@syncfusion/ej2-react-grids";
import {cn} from "~/lib/utils";
import {getAllUsers} from "~/firebase/auth";
import type {Route} from './+types/all-users';
import { redirect } from "react-router";
import { auth, db } from "~/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

// export const clientLoader = async () => {
//     const user = await new Promise<User | null>((resolve, reject) => {
//         const unsubscribe = auth.onAuthStateChanged(
//             user => {
//                 unsubscribe();
//                 resolve(user);
//             },
//             reject
//         );
//     });
//
//     if (!user) {
//         return redirect('/sign-in');
//     }
//
//     const adminDocRef = doc(db, 'admins', user.uid);
//     const adminSnapshot = await getDoc(adminDocRef);
//
//     if (!adminSnapshot.exists()) {
//         return redirect('/');
//     }
//
//     const users = await getAllUsers();
//     return users;
// }

const All_Users = ({loaderData}: Route.ComponentProps) => {
    const { allUsers = [], allAdmins = [] } = loaderData || {};

    const combinedUsers = [
        ...allUsers.map((user: any) => ({ ...user, status: 'user' })),
        ...allAdmins.map((admin: any) => ({ ...admin, status: 'admin' }))
    ];

    return (
        <main className='all-users wrapper'>
            <Headers
                title='Manage Users'
                description='Filter, sort and access detailed user profiles'
            />

            <GridComponent dataSource={combinedUsers} gridLines='None'>
                <ColumnsDirective>
                    <ColumnDirective
                        field='name'
                        headerText='Name'
                        width='200'
                        textAlign='Left'
                        template={(props: any) =>(
                            <div className='flex items-center gap-1.5 px-4'>
                                <img src={props.imageUrl}
                                     alt='user'
                                     className='rounded-full size-8 aspect-square'
                                />

                                <span>{props.name}</span>
                            </div>
                        )}
                    />

                    <ColumnDirective
                        field='email'
                        headerText='Email'
                        width='150'
                        textAlign='Left'
                    />

                    <ColumnDirective
                        field='dateJoined'
                        headerText='Date Joined'
                        width='150'
                        textAlign='Left'
                        template={(props: any) => (
                            <span>{new Date(props.dateJoined.seconds * 1000).toLocaleDateString()}</span>
                        )}
                    />

                    <ColumnDirective
                        field='itineraryCreated'
                        headerText='Itinerary Created'
                        width='150'
                        textAlign='Left'
                    />

                    <ColumnDirective
                        field='status'
                        headerText='Type'
                        width='150'
                        textAlign='Left'
                        template={(props: any) =>(
                            <article className={cn('status-column',
                                props.status === 'user'? 'bg-success-50':
                                    'bg-light-300')}>
                                <div className={cn('size-1.5 rounded-full',
                                    props.status === 'user' ?
                                        'bg-success-500': 'bg-gray-500')} />
                                <h3 className={cn('font-inter text-xs font-medium', props.status === 'user' ?
                                    'text-shadow-success-700': 'text-gray-500')}>
                                    {props.status}
                                </h3>

                            </article>
                        )}
                    />
                </ColumnsDirective>

            </GridComponent>
        </main>
    )
}

export default All_Users;