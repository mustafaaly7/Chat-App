
import './App.css'
import { Navbar } from './components/navbar'
import { Route, Routes } from "react-router";
import { Setting } from './pages/setting';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { Signup } from './pages/signup';
import { Login } from './pages/login';
import { useAuthStore } from './store/useAuthStore';

function App() {


  // for structure routing in every page we'll include navbar  in all the routes mentioned 

const  {authUser , checkAuth}= useAuthStore()
console.log("user state" , checkAuth());

  return (
    <div>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/settings' element={<Setting />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>


    </div>
  )
}

export default App
