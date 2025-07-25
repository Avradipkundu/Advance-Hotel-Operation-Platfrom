import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddRoomsPage from './components/AddRooms'
import ProtectedRoutes from './utils/PrivateRoute'
import Bookings from './components/Bookings'
import Staff from './components/Staff'

function App() {  

  return (
    <>
      <BrowserRouter>
      <Routes>          
          <Route path='/' element={<Login />}/>          
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>          
          <Route path='/admin/rooms' element={<AddRoomsPage/>}/>          
          <Route path='/admin/bookings' element={<Bookings/>}/>          
          <Route path='/admin/staff' element={<Staff/>}/>          
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
