import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const images = [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1460364157752-926555421a7e?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3',
  ];

  // Optimize image loading with priority loading for first few images
  useEffect(() => {
    const preloadImages = images.slice(0, 6).map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  // Optimize intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setLoadedImages(prev => new Set([...prev, index]));
            observerRef.current?.unobserve(entry.target); // Stop observing once loaded
          }
        });
      },
      { 
        rootMargin: '200px', // Increased rootMargin for earlier loading
        threshold: 0
      }
    );

    const elements = document.querySelectorAll('[data-index]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Memoize the image grid to prevent unnecessary re-renders
  const ImageGrid = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <div 
          key={index}
          data-index={index}
          className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                     transition-shadow duration-300 group cursor-pointer bg-white"
          style={{ 
            aspectRatio: '4/5',
            transform: 'translateZ(0)', // Hardware acceleration
            willChange: 'transform' // Optimize for animations
          }}
          onClick={() => setSelectedImage(image)}
        >
          {loadedImages.has(index) && (
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`}
              loading={index < 6 ? "eager" : "lazy"}
              className="object-cover w-full h-full transform transition-transform duration-300 
                       group-hover:scale-105"
              style={{ willChange: 'transform' }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex flex-col items-center justify-end p-6">
            <span className="text-white text-lg font-medium">
              View Photo
            </span>
          </div>
        </div>
      ))}
    </div>
  ), [loadedImages, setSelectedImage]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600
                         rounded-full font-medium tracking-wider uppercase text-sm mb-4">
            Our Gallery
          </span>
          <h2 className="text-5xl font-serif mb-6 text-gray-900">
            Moments We Cherish
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Every photograph tells a story of our journey together, capturing the love, laughter, and precious moments we share.
          </p>
        </div>
        
        {ImageGrid}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-white/95 z-50 backdrop-blur-sm
                        flex items-center justify-center p-4"
            >
              <div className="relative max-w-5xl w-full">
                <img 
                  src={selectedImage} 
                  alt="Selected"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white 
                             shadow-lg flex items-center justify-center
                             hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;