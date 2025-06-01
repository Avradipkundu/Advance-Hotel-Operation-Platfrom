import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RoomManagement from './components/AddRooms'

function App() {  

  return (
    <>
      <BrowserRouter>
      <Routes>          
          <Route path='/' element={<Login />}/>          
          <Route path='/dashboard' element={<Dashboard/>}/>          
          <Route path='/admin/rooms' element={<RoomManagement/>}/>          
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
