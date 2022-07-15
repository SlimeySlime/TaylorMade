import logo from '../taylorLogo.svg';
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { SERVER_PATH } from '../general/config';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'

import { AiOutlineConsoleSql, AiOutlineLock, AiOutlinePhone, AiOutlineUnlock } from "react-icons/ai";

const Login = () => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cookies, setCookie, ] = useCookies();
    let navigate = useNavigate();

    useEffect(() => {
        // todo - check token -> if not 403, redirect to /payments
    }, [])

    function loginCheck(){
        if (id && pw) {
            getAccess()
        }else if (!id){
            alert('전화번호를 입력해주세요.')
        }else if(!pw){
            alert('비밀번호를 입력해주세요.')
        }
        
    }

    function getAccess() {
        // axios.get(SERVER_PATH + '/auth', {
        axios.get(SERVER_PATH + '/auth', {
            params :{
                id : id,
                pw : pw,
            }
        }).then((result) => {
            // console.log(result)
            if (result.data !== undefined && result.data !== -1) {
                const  { accessToken } = result.data

                // console.log(result)
                console.log(accessToken)

                if (accessToken === -1) {
                    alert('전화번호나 비밀번호를 확인해주세요.')
                }else{
                    // default header에 저장❗
                    axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
                    setCookie('accessToken',  accessToken, { path: '/' })
                    navigate('/payments')
                }
            } else {
                console.log('undefined ', result.data[0])
                alert('login error')
            }

        })
    }

    return(
        <div className='max-w-xl flex-col p-2 bg-slate-50 m-4'>
            {/* <div className='max-w-xs'>
                <img src={logo} alt="" />
            </div> */}
            <div className='flex flex-1 justify-center'>
                <p className='text-center text-lg'>
                    조회하려면 핸드폰 번호와 <br /> 비밀번호를 입력해주세요
                </p>
            </div>
            <div className='mt-12 border-2 border-slate-500 bg-white rounded-lg'>
                <div className='flex p-2 border-b border-slate-500'>
                    {/* <p className='m-2 text-md inline'>전화번호</p> */}
                    <AiOutlinePhone className='w-8 h-8 m-2'/>
                    <input className='border-b ml-2 pl-2 bg-blue-50 rounded-lg'  type="text" placeholder='전화번호' name="id" 
                        onChange={(e) => {setId(e.target.value)}} />
                </div>
                <div className='flex m-2'>
                    {/* <p className='m-2 text-md inline'>전화번호</p> */}
                    <AiOutlineLock className='w-8 h-8 m-2'/>
                    <input className='border-b ml-2 pl-2 bg-blue-50 rounded-lg'  type="password" placeholder='비밀번호' name="pw" 
                        onChange={(e) => {setPw(e.target.value)}} />
                </div>
            </div>
            <div className='flex justify-center m-4'>
                <button className='p-2 m-2 w-full bg-blue-500 text-white text-xl font-bold rounded shadow-lg'
                    onClick={() => {loginCheck()}}>로그인</button>
            </div>
        </div>
    )
}

export default Login