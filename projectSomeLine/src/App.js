import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatBox from './components/ChatBox';
import ChatList from './components/ChatList';
import Matching from './components/Matching';
import SideMenu from './components/SideMenu';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';

import TeamMember from './components/TeamMember';
import TendencyMain from './components/TendencyMain';
import CommunitySpace from './components/CommunitySpace';
import CommunityPageLove from './components/CommunityPage';
import CommunityInPage from './components/CommunityInPage';
import CommunityWrite from './components/CommunityWrite';



import { Route, Routes, useLocation, Navigate } from 'react-router-dom';




function App() {

  const location = useLocation();
  const showSideMenu = location.pathname === '/chatbox' || location.pathname === '/chatlist' || location.pathname === '/matching' || location.pathname === '/profile' || location.pathname === '/tendency' || location.pathname === '/community' 
  || location.pathname === '/communitypagelove' || location.pathname === '/communitypageloveinpage1' || location.pathname === '/communitywrite'
  || location.pathname === '/communityinpage' ;


  return (
    <div className="body">
      <Header/>

      {showSideMenu && <Sidebar><SideMenu/></Sidebar>}

      {/* <Sidebar><SideMenu/></Sidebar> */}

      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/chatbox' element={<ChatBox/>}></Route>
        <Route path='/chatlist' element={<ChatList/>}></Route>
        <Route path='/matching' element={<Matching/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/teammember' element={<TeamMember/>}></Route>
        <Route path='/tendency' element={<TendencyMain/>}></Route>
        <Route path='/community' element={<CommunitySpace/>}></Route>

        {/* 테스트용 */}
        <Route path='/communitypagelove' element={<CommunityPageLove/>}></Route>
        <Route path='/communityinpage' element={<CommunityInPage/>}></Route>
        <Route path='/communitywrite' element={<CommunityWrite/>}></Route>
      </Routes>

      {/* <Footer/> */}
    </div>
  );
}

export default App;