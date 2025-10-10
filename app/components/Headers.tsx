import {cn} from "~/lib/utils";
import {Link, useLocation} from "react-router";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";

interface  Props {
    title: string;
    description: string;
    ctaText?: string;
    ctaUrl?: string;
}
const Headers = ({title, description, ctaUrl, ctaText}: Props) => {
    const location = useLocation();

    return (
        <header className='header'>
            <article>
                <h1 className={cn('text-dark-200',
                    location.pathname === '/dashboard' ? 'text-2xl md:text-4xl font-bold': 'text-xl md:text-2xl font-semibold')}>{title}
                </h1>
                <p className={cn('text-gray-100 font-normal',
                    location.pathname === '/dashboard' ? 'text-2xl md:text-4xl font-bold': 'text-xl md:text-2xl font-semibold')}>{description}
                </p>
            </article>

            {ctaText && ctaUrl && (
                <Link to={ctaUrl}>
                    <ButtonComponent type='button'
                                     className='button-class !h-11 !w-full md:w-[240px]'
                    >
                        <img
                            src='/public/icons/plus.svg'
                            alt='plus'
                            className='size-5'
                        />
                        <span className='p-16-semibold text-white'>
                            {ctaText}
                        </span>

                    </ButtonComponent>
                </Link>
            )}
        </header>
    )
}

export default Headers;