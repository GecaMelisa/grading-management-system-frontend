import './App.css'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Members from './pages/Members'
import Profile from './pages/Profile'
import { Route, Routes } from 'react-router-dom'

export default function App() {

  return (
    <div className='root'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/members' element={<Members />} />
      </Routes>
    </div>
  )
}
