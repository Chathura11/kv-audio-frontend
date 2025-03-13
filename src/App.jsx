import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductCard from './components/productCard'

import AdminPage from './pages/admin/adminPage';
import HomePage from './pages/home/homePage'
import Testing from './components/testing'
import Login from './pages/login/login';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  return (
    <BrowserRouter>
      <Toaster/>
      <Routes path="/*">
        <Route path='/testing' element={<Testing/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin/*' element={<AdminPage/>}/>
        <Route path='/*' element={<HomePage/>} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
