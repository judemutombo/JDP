import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './css/style.css';
import SignInPage from './components/Auth/signin';
import SignUpPage from './components/Auth/signup';
import MenuContainer from './components/game/Menus/MenuContainer';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import {Toaster} from "react-hot-toast"
import { useGameStore } from './store/gameStore';

function App() {

  const {userAuth, checkAuth, isCheckingAuth, disconnect} = useAuthStore();

  const {shouldDisconnect} = useGameStore()
  useEffect(() => {
    checkAuth()
  }
  ,[])
  if(shouldDisconnect){
    disconnect()
  }
  if(isCheckingAuth && !userAuth){
    return <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-spinner text-primary w-20"></span>
    </div>

  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userAuth ? <MenuContainer /> : <Navigate to="/signin"/>} />
        <Route path="/signin" element={!userAuth ? <SignInPage /> : <Navigate to="/"/>} />
        <Route path="/signup" element={!userAuth ? <SignUpPage /> : <Navigate to="/"/>} />
      </Routes>
      <Toaster></Toaster>
  </BrowserRouter>
  ) 
}

export default App;
