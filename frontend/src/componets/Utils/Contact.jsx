import React from 'react'
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createNewConcern } from '../../Reducer/ConcernReducer/concernAction';

const Contact = () => {
  const dispatch=useDispatch();
  const {user}= useSelector((state)=>state.user);
  
  const [email,setEmail]=React.useState((user && user.email) || "" );
  const [concern,setConcern]=React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !concern){
      toast.error("Please fill all the fields");
      return;
    }

    dispatch(createNewConcern(email,concern));
    toast.success("Your Concern submitted successfully");
    setEmail("");
    setConcern("");
  };



  return (
    <div className="bg-white ">
    <div className="min-h-screen w-full flex justify-around items-center px-10 
                    max-sm:flex-col-reverse max-sm:px-4 max-sm:py-6 max-sm:gap-6">

      {/* Left Section */}
      <div className="w-full max-w-xl">
        <h1 className="text-7xl font-sans font-semibold mb-8 text-gray-700 
                       max-sm:text-4xl max-sm:text-center max-sm:mb-4">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col mt-2">
          <input
            className="p-4 rounded-lg mb-3 w-full text-xl bg-blue-100 text-black 
                       shadow-sm shadow-blue-100 max-sm:p-3"
            type="email"
            placeholder="Your Email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />

          <textarea
            required
            className="p-4 rounded-lg mb-3 w-full text-xl bg-blue-100 shadow-sm 
                       shadow-blue-100 min-h-[150px] max-sm:p-3"
            placeholder="Type Your Concern"
            onChange={(e)=>setConcern(e.target.value)}
            value={concern}
          />

          {/* Button */}
          <button
            className="p-4 rounded-xl mt-2 text-2xl text-white font-bold shadow-xl bg-blue-500 
                       hover:scale-105 transition-transform duration-300 flex items-center gap-2 
                       w-[120px] max-sm:mx-auto"
          >
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
              <path d="m21.854 2.147-10.94 10.939"/>
            </svg>
          </button>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="flex justify-center">
        <img
          className="max-w-md w-full rounded-xl  max-sm:size-100"
          src="/images/contact.jpeg"
          alt="contact"
        />
      </div> 
      
        
      
    
      

    </div>
    <Footer/>
    </div>
  );
};

export default Contact;
