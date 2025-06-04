import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'

import App from './App.jsx'
import UserList from './userList.jsx'
import DashBoard from './Dashboard.jsx'
import Contact from './Contact.jsx'
import ListProducts from './listProducts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/userlist' element={<UserList/>}/>
          <Route path='/listproducts' element={<ListProducts/>}/>
          <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
