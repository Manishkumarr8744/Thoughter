import React from 'react'

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 py-8 ">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">

        {/* Logo / Title */}
        <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">
          Thougter
        </h2>

      {/* Links */}
      <div className="flex gap-8 text-lg font-medium">
        <a href="/" className="hover:text-white transition">Home</a>
        <a href="/posts" className="hover:text-white transition">Post</a>
        <a href="/contact" className="hover:text-white transition">Contact</a>
        <a href="/about" className="hover:text-white transition">About Us</a>
      </div>

  </div>

      {/* Bottom Line */}
      <p className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Thougter. All rights reserved.
      </p>

      <div className="mt-2" >
        <p className="text-center text-xl">Made With MERN By Manish Kumar</p>
      </div>
    </div>
  )
}

export default Footer