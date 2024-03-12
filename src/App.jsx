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
import AddTour from './components/AddTour.jsx'
import TourDetails from './pages/TourDetails.jsx'
import { CheckSession } from './services/Auth.js'
import UpdatePassword from './pages/UpdatePassword.jsx'
import UserDetails from './pages/UserDetails.jsx'
import EditTour from './components/EditTour.jsx'


function App() {

  const [tours, setTours] = useState([])
  const [user, setUser] = useState(null)
  const [updatedTours, setUpdatedTours] = useState(0)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const getTours = async () => {
    let res = await Client.get('/tours')
    setTours(res.data)
  }

  useEffect(() => {
    getTours()
  }, [updatedTours])
  


  return (
    <div className="container-fluid">
      <header className="container-fluid">
        < Nav 
          user={user}
          handleLogOut={handleLogOut}
        />
      </header>
      <main className="container-fluid mt-5">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours tours={tours} user={user} setUpdatedTours={setUpdatedTours} />}/>
        <Route path="/tours/:id" element={<TourDetails tours={tours} user={user}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/add-tour" element={<AddTour />}/>
        <Route path="/update-password" element={<UpdatePassword />}/>
        <Route path="/user-details" element={<UserDetails user={user}/>}/>
        <Route path="/tours/:id/edit" element={<EditTour tours={tours} setUpdatedTours={setUpdatedTours}/>}/>
      </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
