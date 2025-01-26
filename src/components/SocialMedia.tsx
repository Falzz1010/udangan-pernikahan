import React, { useState, useEffect } from 'react';
import { Share2, Instagram, Facebook, Twitter, Copy, Check } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

interface SocialMediaProps {
  couple: {
    bride: { name: string };
    groom: { name: string };
  };
  weddingDate: Date;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ couple, weddingDate }) => {
  const [copied, setCopied] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);
  
  // Generate wedding hashtags
  const hashtags = [
    `#${couple.bride.name.split(' ')[0]}${couple.groom.name.split(' ')[0]}Wedding`,
    `#${couple.bride.name.split(' ')[0]}And${couple.groom.name.split(' ')[0]}`,
    `#${couple.bride.name.split(' ')[0]}${couple.groom.name.split(' ')[0]}2024`
  ];

  // Share URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Join us at ${couple.bride.name.split(' ')[0]} & ${couple.groom.name.split(' ')[0]}'s Wedding!`)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Join us at ${couple.bride.name.split(' ')[0]} & ${couple.groom.name.split(' ')[0]}'s Wedding! ${window.location.href}`)}`
  };

  // Copy hashtags to clipboard
  const copyHashtags = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    toast.success('Hashtags copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Share handlers
  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#FDF8F5]">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-4">Share Our Joy</h2>
        <p className="text-gray-600 text-center mb-16 max-w-xl mx-auto">
          Help us capture every moment of our special day by sharing and using our wedding hashtags
        </p>

        {/* Share Buttons */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif mb-8">Share With Friends & Family</h3>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => handleShare('facebook')}
                className="p-4 bg-white shadow-lg hover:shadow-xl text-[#1877F2] rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <Facebook className="w-7 h-7" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-4 bg-white shadow-lg hover:shadow-xl text-[#1DA1F2] rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <Twitter className="w-7 h-7" />
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="p-4 bg-white shadow-lg hover:shadow-xl text-[#25D366] rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <Share2 className="w-7 h-7" />
              </button>
            </div>
          </div>

          {/* Wedding Hashtags */}
          <div className="text-center">
            <h3 className="text-2xl font-serif mb-8">Wedding Hashtags</h3>
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-4 transform hover:scale-[1.02] transition-transform duration-300">
              <p className="text-gray-700 text-lg mb-4 font-medium tracking-wide">
                {hashtags.join('  ·  ')}
              </p>
              <button
                onClick={copyHashtags}
                className="inline-flex items-center px-6 py-3 text-sm font-medium bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Hashtags
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Instagram Feed */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-serif text-center mb-8">Share Your Moments</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square bg-white rounded-2xl overflow-hidden relative group shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Instagram className="w-10 h-10 text-gray-300" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-medium px-4 text-center transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Share your photos using<br />our wedding hashtags
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;

