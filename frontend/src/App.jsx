import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from './componets/User/Login';
import Signup from './componets/User/Signup';
import Posts from "./componets/Post/Posts";
import Header from "./componets/Utils/Header"
import Profile from './componets/User/Profile';
import { useDispatch } from 'react-redux';
import { loadUser } from './Reducer/UserReducer/userAction';
import EditProfile from './componets/User/EditProfile';
import ChangePassword from './componets/User/ChangePassword';
import Home from './componets/Utils/Home';
import Contact from './componets/Utils/contact';
import About from './componets/Utils/About';


const App = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch])


  return (
    <BrowserRouter>
    <Header/>
    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/edit" element={<EditProfile/>} />
        <Route path="/profile/change-password" element={<ChangePassword/>} />

      </Routes>
    </BrowserRouter>
    
  )
}

export default App