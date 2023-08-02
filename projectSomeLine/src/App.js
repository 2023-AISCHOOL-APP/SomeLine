import './App.css';

// import Baenner from './components/Baenner';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatBox from './components/ChatBox';
// import Baenner from './components/Baenner';
import ChatList from './components/ChatList';
import Matching from './components/Matching';
import SideMenu from './components/SideMenu';
import Profile from './components/Profile';

import Loding from './components/Loding';

import { Route, Routes, useLocation, Navigate } from 'react-router-dom';




function App() {

  const location = useLocation();
  const showSideMenu = location.pathname === '/chatbox' || location.pathname === '/chatlist' || location.pathname === '/matching' || location.pathname === '/profile';


  return (
    <div className="body">
      <Header/>
      {/* <Baenner/> */}

      {showSideMenu && <SideMenu/>}

      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/chatbox' element={<ChatBox/>}></Route>
        <Route path='/chatlist' element={<ChatList/>}></Route>
        <Route path='/matching' element={<Matching/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        {/* 테스트용 */}
        <Route path='/loding' element={<Loding/>}></Route>
      </Routes>

      {/* <Footer/> */}
    </div>
  );
}

export default App;