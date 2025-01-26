import React from 'react';

interface CoupleProps {
  couple: {
    bride: {
      name: string;
      parents: string;
    };
    groom: {
      name: string;
      parents: string;
    };
  };
}

const HeroSection: React.FC<CoupleProps> = ({ couple }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3")',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative text-center text-white px-4" data-aos="fade-up">
        <p className="text-lg mb-4 font-light tracking-wider" data-aos="fade-up" data-aos-delay="200">
          We're Getting Married
        </p>
        <h1 className="text-5xl md:text-7xl font-serif mb-6" data-aos="fade-up" data-aos-delay="400">
          {couple.bride.name.split(' ')[0]} & {couple.groom.name.split(' ')[0]}
        </h1>
        <div className="w-24 h-0.5 bg-white mx-auto mb-6" data-aos="width" data-aos-delay="600"></div>
        <p className="text-lg font-light tracking-wider" data-aos="fade-up" data-aos-delay="800">
          December 31, 2024
        </p>
        <button 
          className="mt-8 px-8 py-3 border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
          data-aos="fade-up" 
          data-aos-delay="1000"
        >
          Save the Date
        </button>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        data-aos="fade-up"
        data-aos-delay="1200"
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;