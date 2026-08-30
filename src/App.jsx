
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"

import * as postzServices from './services/postzServices'

import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav'
import PostzList from './pages/PostzList';

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if(!token) return null 
   return JSON.parse(atob(token.split('.')[1])).payload
 }

const App = () => {
  
  
  const [user, setUser] = useState(getUserFromToken())
  const [postz, setPostz] = useState([])

  useEffect(() => {
    const fetchAllPostz = async () => {
      const postzData = await postzServices.index()
      setPostz(postzData)
    }
    if (user) fetchAllPostz()
  }, [user])
 

  return (
    <div>
      <Nav user={user} setUser={setUser}/>
      
      <main className="app-main">
      <Routes>

      {/* // is there is user signed go to dashboard else to landing */}
      <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
      {user? (
        <>
        <Route path='/postz' element={<PostzList postz={postz}/>}/>
        
        </>
      ) : ( 
        <>
        <Route path='/sign-up' element={<SignUpForm setUser={setUser}/>} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser}/>}/>
        </>
      )}

       <Route path="*" element={<h2>Page Not Found 👎</h2>} />
      </Routes>
      </main>
    </div>
  );
};

export default App

