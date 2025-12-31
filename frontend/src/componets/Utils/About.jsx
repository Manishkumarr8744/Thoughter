import React from "react";
import Footer from "./Footer";


const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="w-full pt-10 pb-6 px-6 sm:px-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold font-sans text-center lg:text-right lg:mr-10">
          About Us
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center gap-10 px-6 sm:px-10 lg:px-20">
        
        {/* Image */}
        <img
          src="/images/about.jpeg"
          alt="About Thoughter"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl 
                     order-1 lg:order-1"
        />

        {/* Text */}
        <p
          className="text-base sm:text-lg lg:text-2xl font-light text-gray-700 
                     leading-relaxed text-center lg:text-right
                     order-2 lg:order-2"
        >
          We created{" "}
          <span className="font-semibold text-blue-600">Thoughter</span> as a
          space where users can freely share thoughts, start meaningful
          discussions, and connect through words. Whether it’s an opinion, a
          question, an idea, or a moment of inspiration — Thoughter gives you a
          simple, distraction-free environment to express yourself and engage
          with others.
        </p>
      </div>

      {/* Signature */}
      <div className="mt-8 px-6 sm:px-10 text-right">
        <p className="text-xl mb-2 sm:text-2xl lg:text-3xl font-medium text-gray-800 lg:mr-10">
          — Thoughter
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto">
       <Footer/>
      </div>
    </div>
  );
};

export default About;
