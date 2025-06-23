import './App.css'
import { Navbar } from './components/navbar'
import { Navigate, Route, Routes, useLocation } from "react-router"
import { Setting } from './pages/setting'
import { Profile } from './pages/profile'
import { Signup } from './pages/signup'
import { Login } from './pages/login'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import ScreenLoader from './components/Loader'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useTheme'
import Home from './pages/home'

// 🌀 Framer Motion for page transitions
import { AnimatePresence, motion } from 'framer-motion'

// 🌀 AOS for scroll animations
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  const { theme } = useThemeStore()
  const location = useLocation()

  useEffect(() => {
    checkAuth()
    AOS.init({ duration: 800, once: true })
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className='flex justify-center h-screen items-center'>
      <ScreenLoader />
    </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar />

      {/* 🎬 AnimatePresence for smooth transitions between pages */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={
            <PageWrapper>
              {authUser ? <Home /> : <Navigate to={"/login"} />}
            </PageWrapper>
          } />
          <Route path='/login' element={
            <PageWrapper>
              {!authUser ? <Login /> : <Navigate to={"/"} />}
            </PageWrapper>
          } />
          <Route path='/signup' element={
            <PageWrapper>
              {!authUser ? <Signup /> : <Navigate to={"/"} />}
            </PageWrapper>
          } />
          <Route path='/settings' element={
            <PageWrapper>
              <Setting />
            </PageWrapper>
          } />
          <Route path='/profile' element={
            <PageWrapper>
              {authUser ? <Profile /> : <Navigate to={"/login"} />}
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

// 🔁 Reusable wrapper for all page transitions
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
)

export default App
