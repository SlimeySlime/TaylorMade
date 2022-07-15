import logo from '../taylorLogo.svg';
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios'
import { MONTH_KEYWORD, PAYMONTH_dateToString, PAYMONTH_StringToDate, SERVER_PATH } from "../general/config";
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line no-extend-native
Number.prototype.toMoney = function() {
    let num = this.valueOf()
    const result = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return result
}

const Payments = () => {

    const navigate = useNavigate()
    const [cookie, setCookie,] = useCookies();

    const [paymentList, setPaymentList] = useState([])
    const [paymentTypes, setPaymentTypes] = useState([])
    const [paymentFinish, setPaymentFinish] = useState([])
    const paytypeLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]    // 임시
    
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentData, setCurrentPayment] = useState({})
    const [currentTypes, setCurrnetTypes] = useState({})

    const [existPays, setExistPays] = useState({});
    // const [existLength, setExistLength] = useState(0);
    const [existLength, setExistLength] = useState([]);

    useEffect(() => {

        axios.get(SERVER_PATH)      // header에 토큰 저장 
        .then((result) => {
            console.log(result)
            setPaymentList(result.data[0])
            setPaymentTypes(result.data[1])
            setPaymentFinish(result.data[2])
            // console.log(paymentData[paymentData.length - 1])
            // currentData는 가장 마지막 정보로 
            const paymentData = result.data[0]
            // setCurrentMonth(paymentData[paymentData.length - 1].mp_yymm)
            // setCurrentPayment(paymentData[paymentData.length - 1])
            setCurrentMonth(paymentData[0].mp_yymm)
            setCurrentPayment(paymentData[0])
        }).catch((err) => {
            console.log('err at payments axios ', err)
            // todo 403 forbidden : redirect at 3s
            alert('로그인 해주세요.')
            navigate('/')
        })
    }, [cookie.id])

    // 현재달 
    // 다음, 이전달에 마감 or 페이먼트내역이 있어야 이동 
    // 이동한뒤 페이먼트 내역, 이름 리스트 새로고침

    function changeMonth(keyword) {
        let monthDate = PAYMONTH_StringToDate(currentMonth)
        console.log('current monthDate', monthDate.getMonth())
        // let monthString  = monthDate.toLocaleDateString().split('T')[0]
        // monthString = monthString.split('. ').join('')
        if (keyword === MONTH_KEYWORD.prev) {
            monthDate.setMonth(monthDate.getMonth() - 1)
            if (checkValidPayment(PAYMONTH_dateToString(monthDate))) {
                setCurrentMonth(PAYMONTH_dateToString(monthDate))
            }else{
                alert('이전달 내역이 없습니다.')
            }
        }else if (keyword === MONTH_KEYWORD.next){
            monthDate.setMonth(monthDate.getMonth() + 1)
            if (checkValidPayment(PAYMONTH_dateToString(monthDate))) {
                setCurrentMonth(PAYMONTH_dateToString(monthDate))
            }else{
                alert('다음달 내역이 없습니다.')
            }
        }else if(keyword === MONTH_KEYWORD.current) {
            
            if (checkValidPayment(paymentList[0].mp_yymm)) {
                setCurrentMonth(paymentList[0].mp_yymm)
            }else{
                setCurrentMonth(paymentList[1].mp_yymm)
            }

        }
    }
    // check finished && payExist
    function checkValidPayment(yymmString) {
        let finished = false
        paymentFinish.forEach((item) => {
            if (item['PC_Month'] === yymmString) {
                finished = true
            }
        })

        let payExist = false
        paymentList.forEach((item) => {
            if (item['mp_yymm'] === yymmString) {
                payExist = true
            }
        })
        console.log('check vaild ', finished, payExist, finished && payExist)
        return finished && payExist
    }

    useEffect(() => {
        let types = {}
        paymentTypes.forEach(names => {
            if (names.base_yymm === currentMonth) {
                types = names
                setCurrnetTypes(names)
            }
        })
        paymentList.forEach(pay => {
            if (pay.mp_yymm === currentMonth) {
                setCurrentPayment(pay)
                existOnlyList(pay, types)
            }
        });

    }, [currentMonth])

    const existOnlyList = (payments, types) => {
        let payExist = {}
        let payIndex = 0 
        let exceptIndex = 0
        paytypeLength.forEach((index) => {
            // mp_Pay1,2,3.. 항목이 있으면
            if (payments['mp_Pay' + index]) {
                payExist['pay' + payIndex] = [types['base_Pay' + index], payments['mp_Pay' + index]]
                payIndex++
            }

            if (payments['mp_Except' + index]) {
                // payExist[currentTypes['base_Except' + index]] = payments['mp_Except' + index]
                payExist['except' + exceptIndex] = [types['base_Except' + index], payments['mp_Except' + index]]
                exceptIndex++
            }
        })
        console.log('pay exists ', payExist)
        const len = Math.max(payIndex, exceptIndex)
        let existArray = [...Array(len).keys()] // [0, 1, 2, 3, 4, 5]
        setExistLength(existArray)
        setExistPays(payExist)
    }

    function logout() {
        axios.defaults.headers.common['authorization'] = ``;
        navigate('/')
    }

    const ExistPayTable = () => {

        return(
        <tbody className="border">
            {existLength.map((index) => 
            <tr key={index}>
                <td className="py-2 text-xs text-center border p-1 bg-blue-200">{existPays['pay' + index] ? existPays['pay' + index][0] : ''}</td>
                <td className="py-2 text-sm border p-1 text-right">{existPays['pay' + index] !== undefined ? existPays['pay' + index][1].toMoney() : ''}</td>
                <td className="py-2 text-xs text-center border p-1 bg-blue-200">{existPays['except' + index] !== undefined ? existPays['except' + index][0] : ''}</td>
                <td className="py-2 text-sm border p-1 text-right">{existPays['except' + index] !== undefined ? existPays['except' + index][1].toMoney() : ''}</td>
            </tr>
            )}
            <tr>
                <td className="py-4 text-xs text-center font-bold border p-1 bg-green-400">지급합계</td>
                <td className="p-2 border text-sm text-right">{currentData.mp_PaySum?.toMoney()}</td>
                <td className="py-4 text-xs text-center font-bold border p-1 bg-orange-400">공제합계</td>
                <td className="p-2 border text-sm text-right">{currentData.mp_ExceptSum?.toMoney()}</td>
            </tr>
            <tr>
                <td colSpan={2} className="text-md text-center font-bold border p-1 bg-blue-400 text-black">차인지급액</td>
                <td colSpan={2} className="text-md p-2 border text-right">{(currentData.mp_PaySum - currentData.mp_ExceptSum)?.toMoney()}</td>
            </tr>
            
        </tbody>
        )
    }

    return(
        <div className="flex flex-col justify-start items-center mt-4">
            <div className=''>
                <button className="p-1 m-1 rounded bg-slate-600 text-white" onClick={() => {logout()}}>로그아웃</button>
                <button className="p-1 m-1 rounded bg-slate-600 text-white" onClick={() => {navigate('/password')}}>비밀번호 변경</button>
            </div>
            {/* <button className="basis-1/5 p-3 m-1 rounded bg-slate-300 text-white" onClick={() => {logout()}}>로그아웃</button> */}
            <div>
                <button className="p-3 m-1 rounded bg-orange-500 text-white" onClick={() => {changeMonth(MONTH_KEYWORD.prev)}}>이전달</button>
                <button className="p-3 m-1 rounded bg-blue-500 text-white" onClick={() => {changeMonth(MONTH_KEYWORD.current)}}>현재달</button>
                <button className="p-3 m-1 rounded bg-orange-500 text-white" onClick={() => {changeMonth(MONTH_KEYWORD.next)}}>다음달</button>
                <p className="p-4 text-center text-2xl" >{`${currentMonth?.slice(0, 4)}년 ${currentMonth?.slice(4, 6)}월 `} 급여</p>
            </div>
            <div className="flex flex-1 m-2">
                <div className="">
                    {/* <p>부서명 : {currentData.mp_partName}</p> */}
                    <p className="border-b-2? border-black"> 과명 : {currentData.mp_subPartName}</p>
                    <p>직위 : {currentData.mp_Position}</p>
                    <p className="border-b-2 border-black"> 성명 : {currentData.mp_Name}</p>
                </div>
            <div className="border ml-2">
                <table>
                    <tr>
                        <td className="p-1 border text-sm">평일 근무</td>
                        <td className="p-1 border text-sm"></td>
                    </tr>
                    <tr>
                        <td className="p-1 border text-sm">지.조.외</td>
                        <td className="p-1 border text-sm"> {currentData.mp_lateTime} {currentData.mp_earlyTime} {currentData.mp_OutTime}</td>
                    </tr>
                    <tr>
                        <td className="p-1 border text-sm">연장근무</td>
                        <td className="p-1 border text-sm"> {currentData.mp_overtime}</td>
                    </tr>
                    <tr>
                        <td className="p-1 border text-sm">심야근로</td>
                        <td className="p-1 border text-sm"> {currentData.mp_nightTime}</td>
                    </tr>
                    <tr>
                        <td className="p-1 border text-sm">휴일근로</td>
                        <td className="p-1 border text-sm"> {currentData.mp_HolidayTime} </td>
                    </tr>
                </table>
                
            </div>
            </div>
            <div className='flex flex-col p-2 pr-4 w-screen justify-center items-center'>
                <p className="p-2 text-center font-bold text-lg">대단히 수고하셨습니다.</p>
                <table className="max-w-fit">
                    <thead>
                        <tr>
                            <th className="border bg-green-400" colSpan={2}>지급항목</th>
                            <th className="border bg-orange-400" colSpan={2}>공제항목</th>
                        </tr>
                    </thead>

                    {ExistPayTable()}
                    
                </table>
            </div>

        </div>
    )
}

export default Payments