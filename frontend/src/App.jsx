
import { Navigate, Route,Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import Problem from './pages/Problem'
function App() {
  const { isSignedIn,isLoaded } = useUser()
  if(!isLoaded)return null
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn ? <HomePage/>:<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" element={(isSignedIn ?<Dashboard/> :<Navigate to="/"/> )}/>
      <Route path="/problems" element={(isSignedIn ? <ProblemsPage /> : <Navigate to="/" />)}/>
      <Route path='/problem/:id' element={(isSignedIn?<Problem/>:<Navigate to='/'/>)}/>

      
    </Routes>
      
    </>
  )
}

export default App
