// import logo from './logo.svg';
import './App.css';
import Login from './user/Login';
import { Route, Routes } from 'react-router-dom';
import Payments from './user/Payments';
import axios from 'axios'
import { SERVER_PATH } from './general/config';
import TopNavigation from './general/TopNavigation';

function App() {

  // axios.defaults.baseURL = SERVER_PATH

  return (
    <div className="m-0? bg-slate-50 flex flex-col min-h-screen justify-start items-center">
      <TopNavigation className='sticky'/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/payments' element={<Payments />} />
      </Routes>
    </div>
  );
}

export default App;
