import React, { useEffect } from "react";
import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
    
gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ".reveal ",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
        trigger: ".reveal reveal2", 
        start: "top 80%", // animation starts here
        toggleActions: "play none none none",
      },
      }
    );
    gsap.fromTo(
      ".reveal2 ",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
        trigger: ".reveal2", 
        start: "top 90%", // animation starts here
        toggleActions: "play none none none",
      },
      }
    );
    gsap.from(".mask ", {
    x: "100%",
    duration: 1,
    stagger: 0.15,
    ease: "power4.out",
     scrollTrigger: {
        trigger: ".mask ",
        start: "top 80%", // animation starts here
        toggleActions: "play none none none",
      },
  }
  );
  }, []);

  return (
    <div className="overflow-x-hidden  h-full w-full flex flex-col items-center justify-center bg-white ">
      <div className=" text-center flex flex-col justify-center items-center min-h-screen max-w-6xl max-sm:h-[650px]">
        {/* Main Title */}
        <h1 className="text-8xl  max-sm:text-5xl font-extrabold leading-tight max-sm:p-2">
          <span className=" reveal text-8xl text-blue-600 max-sm:text-5xl max-sm:">Thougter</span>  is Here
        </h1>

        {/* Sub Title */}
        <p className="mt-4 text-xl sm:text-3xl font-medium text-gray-700 leading-relaxed">
          Your <span className="text-blue-600">Space ,</span> Your{" "}
          <span className="text-blue-600">Voice ,</span>{" "}
          <br className="sm:hidden" />
          Your daily <span className="text-blue-600">Thoughts</span>
        </p>

        {/* Optional Call-to-action Button */}
        <div className="mt-10">
          <a
            href="/feed"
            className="
              px-8 py-3 
              bg-blue-600 text-white 
              rounded-xl shadow-md 
              hover:bg-blue-700 
              transition 
              text-lg font-semibold
            "
          >
            Start Sharing
          </a>
        </div>
      </div>

      <div className="h-screen w-full bg-[#e2e1ef] flex items-center justify-between px-16 max-sm:flex-col max-sm:h-auto  ">
        {/* Left Text Side */}
        <div className="max-w-xl space-y-4 max-sm:mt-8 ">
          <h1   className="reveal2 text-8xl max-sm:text-6xl max-sm:text-center  font-extrabold font-sans   ">
            Write Your <br className="max-sm:hidden" />
            Thought
          </h1>

          <p className="text-3xl pt-4 font-semibold text-gray-600 max-sm:text-center max-sm:text-2xl">
            Share your ideas, stories, and knowledge with the world.
          </p>
        </div>

        {/* Right Image Side */}
        <div className="relative">
          <img
            src="/images/write.jpg"
            alt="write"
            className="w-[420px] rounded-2xl  hover:scale-105 transition-all duration-300 max-sm:h-[270px]"
          />
        </div>
      </div>

      <div className="h-screen w-full bg-[hsl(0,0%,100%)] flex items-center justify-between px-16 max-sm:flex-col max-sm:h-auto  ">
        {/* Left Text Side */}

        {/* Right Image Side */}
        <div className="relative">
          <img
            src="/images/post.png"
            alt="write"
            className="w-[420px] rounded-2xl  hover:scale-105 transition-all duration-300 max-sm:h-[270px]"
          />
        </div>

        <div className="max-w-xl space-y-4 max-sm:mt-8 ">
          <h1 className=" mask text-8xl text-start max-sm:text-6xl max-sm:text-center  font-extrabold font-sans   ">
            Let Hit To <br className="max-sm:hidden" />
            Post
          </h1>

          <p className="text-3xl pt-4 font-semibold text-gray-600 max-sm:text-center max-sm:text-2xl">
            Let your words travel across the world — reach hearts.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#e2e1ef] min-w-full">
        <div className="flex justify-center mt-14 pt-2">
          <p className="text-7xl text-center font-bold max-sm:text-5xl">Why Choose Us</p>
        </div>

        <div className="flex justify-around mt-16 max-sm:flex-col max-sm:items-center max-sm:gap-8 ">
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center hover:scale-105 transition-all duration-300 max-sm:w-[310px]">
            <p className="text-6xl font-bold text-blue-600">1000+</p>
            <p className="text-3xl font-semibold mt-3">Users</p>
          </div>

          <div className="bg-white rounded-2xl p-12 shadow-lg text-center hover:scale-105 transition-all duration-300 max-sm:w-[310px]">
            <p className="text-6xl font-bold text-blue-600">10000+</p>
            <p className="text-3xl font-semibold mt-3">Posts</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center hover:scale-105 transition-all duration-300 max-sm:w-[310px]">
            <p className="text-6xl font-bold text-blue-600">24×7</p>
            <p className="text-3xl font-semibold mt-3">Support</p>
          </div>
        </div>

        <p className="text-center mx-19 mt-10 py-10 px-7 text-4xl text-medium font-light text-gray-700 leadind-10 max-sm:text-2xl max-sm:mx-3">
          Connect with the world with 1000+ users and explore 10,000+ posts from
          the community. Whether sharing your thoughts or learning new ideas,
          we’re here to help. Enjoy 24×7 support whenever you need it.
        </p>
      </div>

      <Footer/>
      

    </div>
  );
};

export default Home;
