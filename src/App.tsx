import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Navbar from './Navbar'
import Blog from './Blog';
import image from './assets/agnus-dei.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='page'>
      <Navbar/>
      <div style={{
        display: 'flex',
      }}>
        <Blog topic='THEOLOGY' title='Lorem ipsum something something'  image={image} date={new Date('2003-09-17')} featured={false}/>
        <Blog topic='THEOLOGY' title='Lorem ipsum something something'  image={image} date={new Date('2003-09-17')} featured={false}/>
      </div>
    </div>
  )
}

export default App
