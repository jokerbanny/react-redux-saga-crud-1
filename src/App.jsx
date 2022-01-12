import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import AddEditUser from './pages/AddEditUser'
import UserInfo from './pages/UserInfo'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/add-user' element={<AddEditUser />} />
          <Route path='/edit-user/:id' element={<AddEditUser />} />
          <Route path='/user-info/:id' element={<UserInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
