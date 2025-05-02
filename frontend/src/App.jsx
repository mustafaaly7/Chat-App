
import './App.css'
import { Navbar } from './components/navbar'
import { Navigate, Route, Routes } from "react-router";
import { Setting } from './pages/setting';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { Signup } from './pages/signup';
import { Login } from './pages/login';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import ScreenLoader from './components/Loader';

function App() {


  // for structure routing in every page we'll include navbar  in all the routes mentioned 

const  {authUser , checkAuth ,isCheckingAuth}= useAuthStore()

useEffect(()=>{
checkAuth()

},[checkAuth])
console.log("auth user from app.jsx" , authUser);

if(isCheckingAuth && !authUser) return(
  <div className='flex justify-center h-screen items-center'>

<ScreenLoader/>
  </div>
)


  return (
    <div>

      <Navbar />
      <Routes>
        //protected routes based on authuser user states
        <Route path='/' element={ authUser ?  <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser?  <Login /> : <Navigate to={"/"} /> } />
        <Route path='/signup' element={!authUser?  <Signup /> : <Navigate to={"/"} />} />
        <Route path='/settings' element={ authUser ?  <Setting /> : <Navigate to={"/login"} />} />
        <Route path='/profile' element={ authUser ?  <Profile /> : <Navigate to={"/login"} />} />
      </Routes>


    </div>
  )
}

export default App
