import { useState } from 'react'

import './App.css'
import Home from './Components/Home'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet/>
    
    </>
  )
}

export default App
