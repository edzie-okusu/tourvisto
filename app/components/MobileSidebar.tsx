// @ts-nocheck
import React from "react";
import {Link} from "react-router";
import   {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import NavItems from "~/components/NavItems";


const MobileSidebar = () => {
    let sideBar: SidebarComponent
    const toggleSidebar = () => {
        sideBar.toggle()
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <div className='mobile-sidebar wrapper'>
            <header>
                <Link to='/'>
                    <img src='/public/icons/logo.svg'  className='size-[30px]'/>

                    <h1>TourVisto</h1>
                </Link>

                {/*// @ts-ignore*/}
                <button onClick={toggleSidebar}>
                  <img
                      src='public/icons/menu.svg'
                      alt='menu'
                      className='size-7'
                  />
                </button>
            </header>

            <SidebarComponent
                width={270}
                // @ts-ignore
                ref={(SideBar) => sideBar = SideBar }
                created={() => sideBar.hide()}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type='over'
            >
                <NavItems onHandleClick={toggleSidebar} />
            </SidebarComponent>
        </div>
    )
}

export default MobileSidebar;