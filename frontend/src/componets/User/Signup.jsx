import React, { useEffect, useState } from 'react'
import TextType from './TextType'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../Reducer/UserReducer/userAction'
import { clearRegister } from '../../Reducer/UserReducer/userReducer'

const Signup = () => {
    const dispatch=useDispatch();

    const{success,error}=useSelector((state)=>state.user);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");

    const handleSignUp=(e)=>{
        e.preventDefault();
        if (name.trim().length < 3) {
          toast.error("Name must be at least 3 characters long");
          return;
            }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const userData={name,email,password};

    dispatch(registerUser(userData));
    setName(""),setEmail(""),setPassword("")
    }

    useEffect(()=>{
      if(success){
        console.log("user created succesfully");
        toast.success("User Register Successfully!!!")
        dispatch(clearRegister)
      }
      if(error){
        console.log(error);
        toast.error("Email exited already");
         dispatch(clearRegister)
      }

    },[success,error,dispatch])



  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#8FABD4]">
      
      {/* Header with typing effect */}
      <h1 className="text-4xl md:text-5xl overflow-hidden font-bold text-white mb-10 text-center drop-shadow-lg">
        <TextType
          text={["Create Your Thoughter Account!!!"]}
          typingSpeed={50}
          pauseDuration={2000}
          showCursor={false}
          

        />
      </h1>

      {/* Signup Card */}
      <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-[90%] max-w-md backdrop-blur-md">
        <form onSubmit={handleSignUp}>
          {/* Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full  bg-black text-white py-2 rounded-lg font-semibold hover:bg-black-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-700 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
