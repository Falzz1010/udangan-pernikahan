import React from 'react';
import { Heart } from 'lucide-react';

const Navigation = ({ couple }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-accent" />
            <span className="text-lg font-serif text-primary">
              {couple.bride.name.split(' ')[0]} & {couple.groom.name.split(' ')[0]}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {['Home', 'Event', 'Gallery', 'Story', 'RSVP'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;




