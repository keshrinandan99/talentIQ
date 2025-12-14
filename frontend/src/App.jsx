
import { Navigate, Route,Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Problems from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
function App() {
  const { isSignedIn,isLoaded } = useUser()
  if(!isLoaded)return null
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn ? <HomePage/>:<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" element={(isSignedIn ?<Dashboard/> :<Navigate to="/"/> )}/>
      <Route path="/problems" element={(isSignedIn ? <Problems /> : <Navigate to="/" />)} />

      
    </Routes>
      
    </>
  )
}

export default App
