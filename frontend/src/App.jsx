
import { Navigate, Route,Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Problems from './pages/Problems'
import { useUser } from '@clerk/clerk-react'
function App() {
  const { isSignedIn } = useUser()
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/problems" element={(isSignedIn ? <Problems /> : <Navigate to="/" />)} />

      
    </Routes>
      
    </>
  )
}

export default App
