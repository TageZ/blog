import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Navbar from './Navbar'
import Blog from './Blog';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='page'>
      <Navbar/>
      <Blog/>
    </div>
  )
}

export default App
