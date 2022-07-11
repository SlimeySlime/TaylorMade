import logo from '../taylorLogo.svg';
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { SERVER_PATH } from '../general/config';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'

const Login = () => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cookies, setCookie, ] = useCookies();
    let navigate = useNavigate();

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
                pw: pw,
            }
        }).then((result) => {
            const res = result.data[0]
            if (res) {
                console.log('cookie.set.id' , res.ps_Count, )
                setCookie('id', res.ps_Count, { path: '/' })

                navigate('/payments');

            }else{
                console.log('login error')
                alert('login error')
            }

        })
    }

    function debugCheck(){

    }

    return(
        <div className='max-w-xl flex-col p-2 bg-slate-50'>
            <div className='max-w-sm'>
                <img src={logo} alt="" />
            </div>
            <div className='mt-12 border-2 border-slate-500 bg-white rounded-lg'>
                <div className='flex m-2'>
                    <p className='m-2 text-md inline'>전화번호</p>
                    <input className='border-b pl-2 bg-slate-100'  type="text" placeholder='전화번호' name="id" 
                        onChange={(e) => {setId(e.target.value)}} />
                </div>
                <div className='flex m-2'>
                    <p className='m-2 text-md inline'>비밀번호</p>
                    <input className='border-b pl-2 bg-slate-100'  type="text" placeholder='전화번호' name="pw" 
                        onChange={(e) => {setPw(e.target.value)}} />
                </div>
            </div>
            <div className='flex justify-center m-4'>
                <button className='p-2 m-2 w-full bg-green-500 text-white text-xl font-bold rounded shadow-lg'
                    onClick={() => {loginCheck()}}>로그인</button>
            </div>
        </div>
    )
}

export default Login