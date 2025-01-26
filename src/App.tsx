import React from 'react';
import HeroSection from './components/HeroSection';
import CountdownTimer from './components/CountdownTimer';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import LoveStory from './components/LoveStory';
import Wishes from './components/Wishes';
import Footer from './components/Footer';
import SupabaseTest from './components/SupabaseTest';
import GiftRegistry from './components/GiftRegistry';
import SocialMedia from './components/SocialMedia';
import Navigation from './components/Navigation';

function App() {
  // Wedding date - example: December 31, 2024
  const weddingDate = new Date('2024-12-31T10:00:00');
  
  const couple = {
    bride: {
      name: 'Sarah Anderson',
      parents: 'Mr. & Mrs. Anderson'
    },
    groom: {
      name: 'Michael Roberts',
      parents: 'Mr. & Mrs. Roberts'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation couple={couple} />
      <main>
        <HeroSection couple={couple} />
        <CountdownTimer weddingDate={weddingDate} />
        <EventDetails />
        <Gallery />
        <LoveStory />
        <RSVP />
        <Wishes />
        <SocialMedia couple={couple} weddingDate={weddingDate} />
        <Footer couple={couple} />
        <SupabaseTest />
      </main>
    </div>
  );
}

export default App;






