import React from 'react'
import Layout from './component/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './Admin/Login';
import Registration from './Admin/Registration';
import Dashboard from './Admin/Dashboard';
import Display from './Admin/Display';
import Insert from './Admin/Insert';
import CheckOut from './pages/checkout';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Layout/>}>
      <Route index="home" element={<Home/>}/>
      <Route path={"home"} element={<Home/>}/>
      <Route path={"cart"} element={<Cart/>}/>
      <Route path={"login"} element={<Login/>}/>
      <Route path={"/login/registration"} element={<Registration/>}/>
      <Route path ={"/checkout"} element={<CheckOut/>}/>

      {/* <Route path={"/dashboard"} element={<Dashboard/>}/> */}
      
      </Route>


      <Route path={"/dashboard"} element={<Dashboard/>}>
      <Route index="insert" element={<Insert/>}/>
      <Route path={'insert'} element={<Insert/>}/>
      <Route path={'display'} element={<Display/>}/>
      


      </Route>

    </Routes>

    
    </BrowserRouter>
    
    
    
    
    
    </>
  
  )
}

export default App;