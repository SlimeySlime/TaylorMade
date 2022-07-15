import React, { useEffect, useState } from "react";
import { Input, TextField } from '@mui/material'
import axios from 'axios'
import { SERVER_PATH } from "../general/config";
import { useNavigate } from "react-router-dom";

const PassEdit = () => {

    const navigate = useNavigate()

    const [id, setId] = useState('')
    const [oldPWCheck, setOldPwCheck] = useState('')
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [newPw2, setNewPw2] = useState('')

    useEffect(() => {
        // axios.get(SERVER_PATH +  '/user/pw')
        // .then((result) => {
        //     console.log(result)
        // })
    }, [])

    function changePw() {
        // 새 비밀번호 두개 확인
        if (validate()) {
            // if oldPW valid => 
            axios.post(SERVER_PATH + '/user/pw', {
                oldPw : oldPw,
                newPw : newPw
            })
            .then((result) => {
                
                console.log('pw edit', result)

                if (result.status === 200){
                    alert('비밀번호가 변경되었습니다.')
                    navigate('/payments')
                }else{
                    alert('이전 비밀번호가 틀립니다')
                }

            }).catch((err) => {
                // console.log('axios err', err)
                alert('다시 로그인해주세요.')
                navigate('/')
            })

        }else{
            alert('새 비밀번호가 서로 다릅니다.')
        }
    }

    function validate() {
        if (newPw === newPw2) {
            return true
        }else{
            return false
        }
    }

    function cancel() {
        navigate('/payments')
    }

    return(
    <div className='flex flex-col'>
        <div className="flex flex-1 m-8">
            {/* <HiArrowLeft className="w-12 h-12 float-right"/> */}
            <h1 className="text-2xl text-center py-2">비밀번호 변경</h1>
        </div>

        <div className="border-2 border-slate-300 bg-white rounded-md">
            <div className='flex p-4 pt-2'>
                <TextField className="" 
                    label='이전 비밀번호' type="password"
                    variant="standard" 
                    onChange={(e) => {setOldPw(e.target.value)}} />
            </div>
        </div>

        <div className="mt-4 border-2 border-slate-300 bg-white rounded-md">
            <div className='flex p-4 mb-0 pt-2 pb-2'>
                <TextField className=""  
                    label='새 비밀번호' type="password"
                    variant="standard" 
                    onChange={(e) => {setNewPw(e.target.value)}} />
            </div>
            <div className='flex p-4 pt-0'>
                <TextField className="" 
                    label='새 비밀번호 확인' type="password"
                    variant="standard" 
                    onChange={(e) => {setNewPw2(e.target.value)}} />
            </div>
        </div>

        <div className="flex mt-4 justify-center items-center">
            <button className="m-1 p-2 justify-center rounded-lg bg-slate-500 text-white"
                onClick={() => {cancel()}}>취소</button>
            <button className="m-1 p-2 justify-center rounded-lg bg-blue-500 text-white"
                onClick={() => {changePw()}}>비밀번호 변경하기</button>
        </div>
    </div>
    )
}

export default PassEdit