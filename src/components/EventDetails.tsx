import React from 'react';
import { MapPin, Clock, Calendar, Heart } from 'lucide-react';

interface CoupleInfo {
  bride: {
    name: string;
    parents: string;
    birthDate: string;
    image: string;
  };
  groom: {
    name: string;
    parents: string;
    birthDate: string;
    image: string;
  };
}

const EventDetails = () => {
  const coupleInfo: CoupleInfo = {
    bride: {
      name: "Sarah Anderson",
      parents: "Mr. John Anderson & Mrs. Mary Anderson",
      birthDate: "August 15, 1995",
      image: "/path/to/bride-image.jpg"
    },
    groom: {
      name: "Michael Roberts",
      parents: "Mr. James Roberts & Mrs. Emma Roberts",
      birthDate: "June 22, 1993",
      image: "/path/to/groom-image.jpg"
    }
  };

  return (
    <section id="event" className="py-24 bg-[#FDF8F5]">
      <div className="container mx-auto px-4">
        {/* Section Header - Updated styling */}
        <div className="text-center mb-20">
          <span className="text-rose-500 font-light tracking-widest uppercase text-sm mb-3 block">Our Special Day</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">The Happy Couple</h2>
          <div className="w-24 h-0.5 bg-rose-300 mx-auto"></div>
        </div>

        {/* Couple Information - Enhanced styling */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Groom - Updated styling */}
            <div className="text-center order-1">
              <div className="relative mb-6 md:mb-8 group">
                <div className="absolute inset-0 bg-rose-100 rounded-full transform -rotate-6 transition-transform group-hover:rotate-0"></div>
                <div className="relative aspect-square overflow-hidden rounded-full border-4 md:border-8 border-white shadow-xl">
                  <img
                    src={coupleInfo.groom.image}
                    alt={coupleInfo.groom.name}
                    className="w-full h-full object-cover transform scale-100 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-2">{coupleInfo.groom.name}</h3>
              <p className="text-gray-600 mb-3 text-sm md:text-base font-light">
                Born: {coupleInfo.groom.birthDate}
              </p>
              <div className="space-y-2">
                <p className="text-rose-500 italic text-xs md:text-sm">Son of</p>
                <p className="text-gray-800 font-medium text-sm md:text-base">{coupleInfo.groom.parents}</p>
              </div>
            </div>

            {/* Heart Icon - Enhanced styling */}
            <div className="hidden md:flex flex-col items-center justify-center space-y-8 order-2">
              <div className="w-32 h-32 bg-rose-50 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-500 hover:scale-110 hover:shadow-2xl">
                <Heart className="w-16 h-16 text-rose-400" fill="currentColor" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-serif text-gray-800 mb-2">We're Getting Married</p>
                <p className="text-rose-500 font-light">December 31, 2024</p>
              </div>
            </div>

            {/* Bride - Updated styling */}
            <div className="text-center order-2 md:order-3">
              <div className="relative mb-6 md:mb-8 group">
                <div className="absolute inset-0 bg-rose-100 rounded-full transform rotate-6 transition-transform group-hover:rotate-0"></div>
                <div className="relative aspect-square overflow-hidden rounded-full border-4 md:border-8 border-white shadow-xl">
                  <img
                    src={coupleInfo.bride.image}
                    alt={coupleInfo.bride.name}
                    className="w-full h-full object-cover transform scale-100 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-2">{coupleInfo.bride.name}</h3>
              <p className="text-gray-600 mb-3 text-sm md:text-base font-light">
                Born: {coupleInfo.bride.birthDate}
              </p>
              <div className="space-y-2">
                <p className="text-rose-500 italic text-xs md:text-sm">Daughter of</p>
                <p className="text-gray-800 font-medium text-sm md:text-base">{coupleInfo.bride.parents}</p>
              </div>
            </div>

            {/* Mobile Heart Icon - Enhanced styling */}
            <div className="col-span-2 md:hidden flex flex-col items-center justify-center py-8 order-3">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center shadow-xl">
                <Heart className="w-12 h-12 text-rose-400" fill="currentColor" />
              </div>
              <div className="text-center mt-6">
                <p className="text-xl font-serif text-gray-800 mb-2">We're Getting Married</p>
                <p className="text-rose-500 font-light">December 31, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section Header - Updated styling */}
        <div className="text-center mb-16">
          <span className="text-rose-500 font-light tracking-widest uppercase text-sm mb-3 block">Join Us</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Wedding Events</h2>
          <div className="w-24 h-0.5 bg-rose-300 mx-auto"></div>
        </div>
        
        {/* Event Details - Enhanced cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Holy Matrimony - Updated card */}
          <div 
            className="bg-white p-8 rounded-lg shadow-lg text-center"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-2xl font-serif">Holy Matrimony</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-gray-700">
                <Calendar className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>December 31, 2024</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700">
                <Clock className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>10:00 AM - 11:30 AM</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700">
                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>St. Mary's Cathedral</span>
              </div>
            </div>
            <button 
              onClick={() => window.open('https://maps.google.com')}
              className="mt-8 w-full px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center space-x-2 group"
            >
              <MapPin className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
              <span>View Location</span>
            </button>
          </div>

          {/* Wedding Reception - Updated card */}
          <div 
            className="bg-white p-8 rounded-lg shadow-lg text-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-2xl font-serif">Wedding Reception</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-gray-700">
                <Calendar className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>December 31, 2024</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700">
                <Clock className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>12:30 PM - 4:00 PM</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700">
                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>Grand Ballroom, Luxury Hotel</span>
              </div>
            </div>
            <button 
              onClick={() => window.open('https://maps.google.com')}
              className="mt-8 w-full px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center space-x-2 group"
            >
              <MapPin className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
              <span>View Location</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;



