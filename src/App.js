// import logo from './logo.svg';
import './App.css';
import Login from './user/Login';
import { Route, Routes } from 'react-router-dom';
import Payments from './user/Payments';
import axios from 'axios'
import { SERVER_PATH } from './general/config';

function App() {

  // axios.defaults.baseURL = SERVER_PATH

  return (
    <div className="bg-slate-50 flex flex-col min-h-screen justify-center items-center">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/payments' element={<Payments />} />
      </Routes>
    </div>
  );
}

export default App;
