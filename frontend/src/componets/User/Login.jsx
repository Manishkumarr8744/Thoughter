import React, { useEffect, useState } from 'react'
import TextType from './TextType'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginUser,clearErrors} from "../../Reducer/UserReducer/userAction"

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {isAuthenticated,error}=useSelector((state)=>state.user)

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");




    const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser(email,password));
    }

    useEffect(()=>{
      if(isAuthenticated){
        toast.success("Logged-in Successfully");
        navigate("/posts");
      }

      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
    },[isAuthenticated,error,navigate,dispatch])

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#8FABD4]">
      
      {/* Header with typing effect */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-lg">
        <TextType
          text={["Login To Your Thoughter Account!!!"]}
          typingSpeed={50}
          pauseDuration={2000}
          showCursor={false}
          cursorCharacter="|"
        />
      </h1>

      {/* Login Card */}
      <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-[90%] max-w-md backdrop-blur-md">
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-black-700 font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
           
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Sign-up Link */}
        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
