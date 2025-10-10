import {Link, redirect, useLocation, useNavigate} from "react-router";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {handleAdminGoogleSignIn} from "~/firebase/auth";
import type {User as FirebaseUser} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {auth,db} from "~/firebase/client";

export const clientLoader = async () => {
    const firebaseUser = await new Promise<FirebaseUser | null>((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
            user => {
                unsubscribe();
                resolve(user);
            },
            reject
        );
    });

    if (firebaseUser) {
        const adminDocRef = doc(db, 'admins', firebaseUser.uid);
        const adminSnapshot = await getDoc(adminDocRef);
        if (adminSnapshot.exists()) {
            return redirect('/dashboard');
        }
    }

    return null;
}


const AdminSignIn =  () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignIn = async () => {
        try {
            await handleAdminGoogleSignIn();
            navigate(location.state?.from || '/dashboard', { replace: true });
        } catch (error) {
            console.error("Admin sign-in failed:", error);
        }
    };

    return (
        <main className='auth'>
            <section className='size-full glassmorphism flex-center px-6'>

                <div className='sign-in-card'>
                    <header className='header'>
                        <Link to='/'>
                            <img
                                src='/icons/logo.svg'
                                alt='logo'
                                className='size-[30px]'
                            />
                        </Link>
                        <h1 className='p-28-bold text-dark-100'>
                            TourVisto  Admin
                        </h1>
                    </header>

                    <article>
                        <h2 className='p-28-semibold text-dark-100 text-center'>
                            Manage Your Travel Journey Business
                        </h2>

                        <p className='p-18-regular text-center text-gray-100 !leading-7'>
                            Sign in with Google to manage destinations, itineraries, and user activity with ease
                        </p>
                    </article>

                    <ButtonComponent
                        type='button'
                        cssClass='e-primary'
                        className='!h-11 !w-full'
                        onClick={handleSignIn}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <img
                                src='/icons/google.svg'
                                className='size-5'
                                alt='google'
                            />
                            <span className='p-18-semibold text-white'>
                                Sign in with Google
                            </span>
                        </div>
                    </ButtonComponent>
                </div>
            </section>
        </main>
    )
}

export default AdminSignIn;
