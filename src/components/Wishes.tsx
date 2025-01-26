import React, { useState, useEffect } from 'react';
import { Gift, Heart, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast, Toaster } from 'react-hot-toast';

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
  likes: number;
  liked_by: string[]; // Array of user IPs who liked this wish
}

const Wishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newWish, setNewWish] = useState({
    name: '',
    message: ''
  });
  const [userIP, setUserIP] = useState<string>('');
  const [isLiking, setIsLiking] = useState<{ [key: number]: boolean }>({});

  // Fetch wishes from Supabase
  useEffect(() => {
    fetchWishes();
  }, []);

  // Fetch user IP on component mount
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    fetchIP();
  }, []);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
      toast.error('Failed to load wishes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newWish.name.trim() || !newWish.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([{
          name: newWish.name,
          message: newWish.message
        }])
        .select()
        .single();

      if (error) throw error;

      setWishes(prev => [data, ...prev]);
      setNewWish({ name: '', message: '' });
      toast.success('Thank you for your wishes! 💝');
    } catch (error) {
      console.error('Error submitting wish:', error);
      toast.error('Failed to submit wish');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle like/unlike wish
  const handleLike = async (wishId: number) => {
    if (!userIP || isLiking[wishId]) return;

    setIsLiking(prev => ({ ...prev, [wishId]: true }));

    try {
      const wish = wishes.find(w => w.id === wishId);
      if (!wish) return;

      const hasLiked = wish.liked_by?.includes(userIP);
      const newLikes = hasLiked ? wish.likes - 1 : wish.likes + 1;
      const newLikedBy = hasLiked 
        ? wish.liked_by.filter(ip => ip !== userIP)
        : [...(wish.liked_by || []), userIP];

      const { error } = await supabase
        .from('wishes')
        .update({ 
          likes: newLikes,
          liked_by: newLikedBy
        })
        .eq('id', wishId);

      if (error) throw error;

      // Update local state
      setWishes(prev => prev.map(w => 
        w.id === wishId 
          ? { ...w, likes: newLikes, liked_by: newLikedBy }
          : w
      ));

      toast.success(hasLiked ? 'Like removed' : 'Thanks for your love! 💝');
    } catch (error) {
      console.error('Error updating like:', error);
      toast.error('Failed to update like');
    } finally {
      setIsLiking(prev => ({ ...prev, [wishId]: false }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <section id="wishes" className="py-20 bg-[#FDF8F5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <Heart className="w-10 h-10 text-rose-500 mx-auto mb-4" />
              <h2 className="text-3xl font-serif mb-4">Wishes & Greetings</h2>
              <p className="text-gray-600">Share your love and blessings with the happy couple</p>
            </div>
            
            {/* Add Wish Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={newWish.name}
                    onChange={(e) => setNewWish(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Write your wishes for the couple..."
                    value={newWish.message}
                    onChange={(e) => setNewWish(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Wishes</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Wishes List */}
            <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-rose-500 mb-4" />
                  <p className="text-gray-500">Loading wishes...</p>
                </div>
              ) : wishes.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <Heart className="w-12 h-12 mx-auto text-rose-500 mb-4" />
                  <p className="text-gray-500">Be the first to send your wishes!</p>
                </div>
              ) : (
                wishes.map(wish => (
                  <div 
                    key={wish.id} 
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {wish.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{wish.name}</h3>
                            <span className="text-sm text-gray-500">{formatDate(wish.created_at)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleLike(wish.id)}
                          disabled={isLiking[wish.id]}
                          className="group flex items-center space-x-1 p-1 hover:bg-rose-50 rounded-full transition-colors"
                        >
                          <Heart 
                            className={`w-5 h-5 transition-all ${
                              wish.liked_by?.includes(userIP)
                                ? 'fill-rose-500 text-rose-500'
                                : 'text-gray-400 group-hover:text-rose-500'
                            } ${isLiking[wish.id] ? 'animate-pulse' : ''}`}
                          />
                          {wish.likes > 0 && (
                            <span className={`text-sm ${wish.liked_by?.includes(userIP) ? 'text-rose-500' : 'text-gray-500'}`}>
                              {wish.likes}
                            </span>
                          )}
                        </button>
                      </div>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{wish.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-rose-50 rounded-full">
                <Gift className="w-12 h-12 text-rose-500" />
              </div>
            </div>
            <h2 className="text-3xl font-serif mb-4">Wedding Gift</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have provided our registry details below.
            </p>

            {/* Bank Account Details */}
            <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-12">
              <div className="bg-[#FDF8F5] p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-4">Bank Transfer</h3>
                <div className="space-y-3">
                  <p className="font-medium text-gray-900">Bank BCA</p>
                  <p className="text-lg font-mono text-gray-700">1234 5678 90</p>
                  <p className="text-gray-600">a/n Sarah Anderson</p>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('1234567890');
                      toast.success('Account number copied!');
                    }}
                    className="mt-4 w-full px-4 py-2.5 text-sm bg-white border-2 border-rose-500 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Account Number</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#FDF8F5] p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-4">Digital Wallet</h3>
                <div className="space-y-3">
                  <p className="font-medium text-gray-900">GoPay</p>
                  <p className="text-lg font-mono text-gray-700">0812-3456-7890</p>
                  <p className="text-gray-600">a/n Michael Roberts</p>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('081234567890');
                      toast.success('Phone number copied!');
                    }}
                    className="mt-4 w-full px-4 py-2.5 text-sm bg-white border-2 border-rose-500 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Phone Number</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-[#FDF8F5] p-8 rounded-2xl max-w-2xl mx-auto hover:shadow-lg transition-all duration-300">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l.003-.004.25-.009a17.905 17.905 0 0117.5 0l.25.009L21 10M3 10v11a2 2 0 002 2h14a2 2 0 002-2V10M3 10l6.75-6.75a2 2 0 012.83 0L19 10" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-4">Shipping Address</h3>
              <p className="text-gray-600 mb-4">
                For physical gifts, you may send them to:
              </p>
              <div className="bg-white p-4 rounded-xl mb-4 inline-block">
                <p className="text-gray-800">
                  Sarah & Michael<br />
                  123 Wedding Street<br />
                  Celebration City, 12345<br />
                  Phone: (123) 456-7890
                </p>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('Sarah & Michael\n123 Wedding Street\nCelebration City, 12345');
                  toast.success('Address copied!');
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-sm bg-white border-2 border-rose-500 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Address</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishes;
