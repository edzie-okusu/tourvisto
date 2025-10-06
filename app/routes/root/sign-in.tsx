import {Link} from "react-router";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {handleGoogleSignIn} from "~/firebase/auth";



const signin =  () => {
    const handleSignIn = () => {}
    return (
        <main className='auth'>
            <section className='size-full glassmorphism flex-center px-6'>

                <div className='sign-in-card'>
                    <header className='header'>
                        <Link to='/'>
                            <img
                                src='/public/icons/logo.svg'
                                alt='logo'
                                className='size-[30px]'
                            />
                        </Link>
                        <h1 className='p-28-bold text-dark-100'>
                            TourVisto
                        </h1>
                    </header>

                    <article>
                        <h2 className='p-28-semibold text-dark-100 text-center'>
                            Start Your Travel Journey
                        </h2>

                        <p className='p-18-regular text-center text-gray-100 !leading-7'>
                            Sign in with Google to manage destinations, itineraries, and user activity with ease
                        </p>
                    </article>

                    <ButtonComponent
                        type='button'
                        iconCss='e-search-icon'
                        className='button-class !h-11 !w-full'
                        onClick={handleGoogleSignIn}
                    >
                        <img
                            src='/public/icons/google.svg'
                            className='size-5'
                            alt='google'
                        />
                        <span className='p-18-semibold text-white'>
                            Sign in with Google
                        </span>
                    </ButtonComponent>
                </div>
            </section>
        </main>
    )
}

export default signin