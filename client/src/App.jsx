import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingNavbar from './components/header/Nav'
import Layout from './Layout'
import Home from './components/Home/Home'
import RoomPages from './pages/RoomPages'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />} />
            <Route path='rooms' element={<RoomPages />} />            
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
