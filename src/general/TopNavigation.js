import React, { useState } from "react";
import logo from '../taylorLogo.svg'
import { HiMenuAlt2 } from "react-icons/hi";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopNavigation = () => {

    const navigate = useNavigate()
    const [navVisible, setNavVisible] = useState(false)

    function onOffNav() {
        setNavVisible(!navVisible)
    }

    function toPassEdit() {
        setNavVisible(!navVisible)
        navigate('/password')
    }

    return(
        <nav className="flex flex-1 w-screen max-h-12 top-0 sticky bg-blue-100">
            {/* logo */}
            <div className='flex flex-1 justify-center p-2'>
                <img className="" src={logo}  alt="" />
            </div>

            <div className='hidden flex? float-right mr-2 py-1'>
                <HiMenuAlt2 className='w-10 h-10 p-1' color='black' onClick={() => {onOffNav()}}/>
                <p className='flex text-black font-preten py-2 font-semibold' onClick={() => {onOffNav()}}>메뉴</p>
            </div>
            <div className="float-right mr-2">
                <FaCog className="p-2 w-12 h-12" onClick={() => {onOffNav()}}/>
                {navVisible && 
                <div className="absolute right-0">
                    {/* <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-blue-600"></div> */}
                    <p className="p-2 mr-2 bg-slate-600 text-white border-white"
                        onClick={() => {toPassEdit()}}>비밀번호 변경</p>
                </div>
                }
            </div>
        </nav>
    )
    
}

export default TopNavigation