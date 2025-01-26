import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  weddingDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate initial time
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());

    // Update every second but use requestAnimationFrame for smoother updates
    let frameId: number;
    let lastUpdate = Date.now();
    
    const update = () => {
      const now = Date.now();
      if (now - lastUpdate >= 1000) { // Only update every second
        setTimeLeft(calculateTimeLeft());
        lastUpdate = now;
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [weddingDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md mx-2">
      <div className="text-4xl md:text-5xl font-bold mb-2 text-rose-600">{value}</div>
      <div className="text-sm md:text-base font-medium text-gray-600 uppercase tracking-wider">{label}</div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-8 text-gray-800">
          Counting Down to Our Special Day
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Join us as we celebrate our love story. Every moment brings us closer to forever.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;