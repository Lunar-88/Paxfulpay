
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center  text-white relative"
      style={{ backgroundImage: "url('/paxful.png')" }}>

        {/* Text content */}
        <div className="text-center pt-40 text-4xl font-semibold lg:text-left max-w-md">
          <p className="mb-6">The <span className='text-lime-300'>people-
            <br/>powered way</span> 
            <br/><span>to move money</span></p>
            <p className="text-sm mb-8 pt-24">
                Experience the freedom of peer-to-peer payments with PaxPay.
                <br/>
                accept payments from anywhere in the world, instantly and securely.
            </p>
            <div className='flex justify-center lg:justify-start'>
            <button className="bg-transparent border-2 border-lime-300 text-lime-300 px-9 py-2 rounded-full text-xl font-semibold ml-4">
                Send 
            </button>
            <button type='button' onClick={() => navigate('/login')} className="bg-transparent border-2 border-lime-300 text-lime-300 px-6 py-1 rounded-full text-xl font-bold ml-4">
                Accept
            </button>
            </div>
        </div>
    </div>
  );
};

export default Hero;
