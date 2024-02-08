import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Tours from './pages/Tours.jsx'
import Nav from './components/Nav'
import Client from './services/api.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import About from './pages/About.jsx'
import AddTour from './pages/AddTour.jsx'
import TourDetails from './pages/TourDetails.jsx'
import { CheckSession } from './services/Auth.js'
import UpdatePassword from './pages/UpdatePassword.jsx'


function App() {

  const[tours, setTours] = useState([])
  const [ user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if (token)   {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const getTours = async () => {
      let res = await Client.get('/tours')
      setTours(res.data)
    } 
    getTours()
  }, [])

  return (
    <div>
      <header>
        < Nav 
          user={user}
          handleLogOut={handleLogOut}
        />
      </header>
      <main></main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours tours={tours} user={user}/>}/>
        <Route path="/tours/:id" element={<TourDetails tours={tours} user={user}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/add-tour" element={<AddTour />}/>
        <Route path="/update-password" element={<UpdatePassword />}/>
      </Routes>
      <footer></footer>
    </div>
  )
}

export default App
