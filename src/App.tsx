import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='page'>
      <Navbar/>
    </div>
  )
}

export default App
