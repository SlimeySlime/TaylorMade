import React from "react";
import logo from '../taylorLogo.svg'
import { HiMenuAlt2 } from "react-icons/hi";

const TopNavigation = () => {

    function onOffNav() {

    }

    return(
        <nav className="flex flex-1 w-screen max-h-12 top-0 sticky bg-blue-100">
            {/* logo */}
            <div className='flex flex-1 p-2'>
                <img className="" src={logo}  alt="" />
            </div>

            <div className='flex float-right mr-2 py-1'>
                <HiMenuAlt2 className='w-10 h-10 p-1' color='black' onClick={() => {onOffNav()}}/>
                <p className='flex text-black font-preten py-2 font-semibold' onClick={() => {onOffNav()}}>메뉴</p>
            </div>
        </nav>
    )
    
}

export default TopNavigation