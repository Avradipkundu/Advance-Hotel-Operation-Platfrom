import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddRoomsPage from './components/AddRooms'
import ProtectedRoutes from './utils/PrivateRoute'

function App() {  

  return (
    <>
      <BrowserRouter>
      <Routes>          
          <Route path='/' element={<Login />}/>          
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>          
          <Route path='/admin/rooms' element={<AddRoomsPage/>}/>          
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
