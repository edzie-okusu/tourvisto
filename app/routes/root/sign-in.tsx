import {Link, redirect, useLocation, useNavigate} from "react-router";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import { handleGoogleSignIn, storeUserData} from "~/firebase/auth";
import {useEffect} from "react";
import {onAuthStateChanged, type User} from "firebase/auth";
import {auth, db} from "~/firebase/client";
import { doc, getDoc } from "firebase/firestore";


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

    if (user) {
        // User is authenticated, check if they have a profile.
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            // If the user profile doesn't exist, create it.
            await storeUserData(user, user.photoURL);
        }

        // Redirect logged-in users to the home page.
        return redirect('/');
    }

    // If no user is logged in, render the sign-in page.
    return null;
}

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignIn = async () => {
        try {
           await handleGoogleSignIn();
            // After sign-in, the loader on the destination route will handle profile creation.
            navigate(location.state?.from || '/', { replace: true });
        } catch (error) {
            console.error("Sign-in failed:", error);
            // Optionally, display an error message to the user
        }
    };

    return (
        <main className='auth'>
            <section className='size-full glassmorphism flex-center px-6'>

                <div className='flex flex-col gap-4 w-full max-w-[370px]'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-2xl font-semibold text-dark-100'>
                            Sign in to your account
                        </h1>
                        <p className='text-sm font-normal text-gray-500'>
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <ButtonComponent
                        onClick={handleSignIn}
                        cssClass='e-inherit e-primary'
                    >
                        <div className="flex items-center gap-2">
                            <img src="/assets/google.svg" alt=""/>
                            <p>Continue with Google</p>
                        </div>
                    </ButtonComponent>


                    <p className='text-sm text-center font-normal text-gray-500'>
                        Don’t have an account?
                        <Link to='/sign-up' className='text-primary-500 font-semibold underline'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </section>
            <section className='hidden md:block size-full'>
                <img src="/assets/pana.svg" alt="" className='size-full object-cover'/>
            </section>
        </main>
    )
}

export default SignIn;
