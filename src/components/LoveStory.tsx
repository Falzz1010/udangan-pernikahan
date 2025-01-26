import React from 'react';

const LoveStory = () => {
  const timeline = [
    {
      date: 'June 15, 2020',
      title: 'First Meeting',
      description: 'We first met at a local coffee shop. A chance encounter that changed our lives forever.'
    },
    {
      date: 'December 24, 2020',
      title: 'First Date',
      description: 'Our first official date was during Christmas Eve. We walked through the city lights and knew this was special.'
    },
    {
      date: 'August 30, 2021',
      title: 'Moving In Together',
      description: 'We decided to take the next step in our relationship and create our first home together.'
    },
    {
      date: 'February 14, 2023',
      title: 'The Proposal',
      description: "On Valentine's Day, under the stars, we decided to spend the rest of our lives together."
    }
  ];

  return (
    <section id="story" className="py-20 bg-gradient-to-b from-[#FDF8F5] to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-16 text-gray-800 relative">
          Our Love Story
          <div className="absolute left-1/2 -translate-x-1/2 w-24 h-1 bg-rose-400 mt-4"></div>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {timeline.map((event, index) => (
            <div 
              key={index} 
              className="relative pl-8 pb-16 last:pb-0 hover:transform hover:translate-x-2 transition-transform duration-300"
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 h-full w-px bg-rose-200">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-400 border-4 border-white shadow-lg"></div>
              </div>
              
              {/* Content */}
              <div className="ml-8 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block px-4 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium mb-3">
                  {event.date}
                </span>
                <h3 className="text-2xl font-serif mb-3 text-gray-800">{event.title}</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;