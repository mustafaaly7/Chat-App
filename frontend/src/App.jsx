
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
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useTheme';

function App() {


  // for structure routing in every page we'll include navbar  in all the routes mentioned 

const  {authUser , checkAuth ,isCheckingAuth}= useAuthStore()
const {theme} = useThemeStore()

// use effect to check auth from backend and cookies 
// and implementing loader on entire website 

useEffect(()=>{
checkAuth()

},[checkAuth])


// conditional rendering of loader based on loading state and auth user state 
if(isCheckingAuth && !authUser) return(
  <div className='flex justify-center h-screen items-center'>

<ScreenLoader/>
  </div>
)


  return (
    <div data-theme={theme}>

      <Navbar />
      <Routes>
        //protected routes based on authuser user states
        <Route path='/' element={ authUser ?  <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser?  <Login /> : <Navigate to={"/"} /> } />
        <Route path='/signup' element={!authUser?  <Signup /> : <Navigate to={"/"} />} />
        <Route path='/settings' element={<Setting/>}/>
        <Route path='/profile' element={ authUser ?  <Profile /> : <Navigate to={"/login"} />} />
      </Routes>

      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  )
}

export default App
