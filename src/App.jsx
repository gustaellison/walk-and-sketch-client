import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Tours from './components/Tours'
import Nav from './components/Nav'
import Client from './services/api.js'

function App() {

  const[tours, setTours] = useState([])

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
        < Nav />
      </header>
      <main></main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours tours={tours}/>}/>
      </Routes>
      <footer></footer>
    </div>
  )
}

export default App
