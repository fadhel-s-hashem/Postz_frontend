
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"

import * as postzServices from './services/postzServices'
import * as commentsServices from './services/comments'

import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav'
import PostzList from './pages/PostzList';
import PostzDetail from './pages/PostzDetail';
import PostzForm from './pages/PostzForm';

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if(!token) return null 
   return JSON.parse(atob(token.split('.')[1])).payload
 }

const App = () => {
  const navigate = useNavigate()
  
  const [user, setUser] = useState(getUserFromToken())
  const [postz, setPostz] = useState([])

  useEffect(() => {
    const fetchAllPostz = async () => {
      const postzData = await postzServices.index()
      setPostz(postzData)
    }
    if (user) fetchAllPostz()
  }, [user])

  const handleAddPost = async (formData) => {
    const newpost = await postzServices.create(formData)
    setPostz([newpost, ...postz])
    navigate('/postz')
  }

  const handleDeletePost = async (postId) => {
  try {
    await postzServices.deletePostz(postId)

    const filteredPostz = postz.filter((post) => {
      return post._id !== postId
    })

    setPostz(filteredPostz)
    navigate('/postz')
  } catch (err) {
    console.error('Error deleting post:', err)
  }
}

const handleUpdatePostz = async (postId, formData) => {
    const updatedPost = await postzServices.update(postId, formData)
    const updatedPostzList = postz.map((post) => {
      return postId === post._id ? updatedPost : post
    })
    setPostz(updatedPostzList)
    navigate(`/postz/${postId}`)
  }

 

  return (
    <div>
      <Nav user={user} setUser={setUser}/>
      
      <main className="app-main">
      <Routes>

      <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
      {user? (
        <>
        <Route path='/postz' element={<PostzList postz={postz}/>}/>
        <Route path='/postz/:postId' element={ <PostzDetail user={user} handleDeletePost={handleDeletePost}/>}/>
        <Route path='/postz/new' element={<PostzForm handleAddPost={handleAddPost}/>}/>
        <Route path="/postz/:postId/edit" element={<PostzForm handleUpdatePostz={handleUpdatePostz} />}/>
        
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

