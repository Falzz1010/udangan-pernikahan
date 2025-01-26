import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Loader2, Mail, X } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
  </div>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      toast.success('Check your email for the login link! 📧', {
        duration: 5000,
        icon: '✨'
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send login link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Sign In to Like</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Magic Link...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Magic Link</span>
                  </>
                )}
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-500">
              We'll send you a magic link to sign in instantly
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: true,
    guests: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting RSVP...');
      
      // 1. Save to database
      const { error: dbError } = await supabase
        .from('rsvp_responses')
        .insert([{
          name: formData.name,
          email: formData.email,
          attending: formData.attending,
          guests: formData.guests,
          message: formData.message
        }]);

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      console.log('Database save successful');

      // 2. Send email
      console.log('Sending email...');
      const { data: emailData, error: emailError } = await supabase.functions.invoke(
        'send-rsvp-email',
        {
          body: {
            to: formData.email,  // Email akan selalu dikirim ke h29614713@gmail.com untuk testing
            name: formData.name,
            attending: formData.attending,
            guests: formData.guests,
            message: formData.message
          }
        }
      );

      if (emailError) {
        console.error('Email error:', emailError);
        throw new Error('Failed to send confirmation email');
      }

      console.log('Email sent successfully:', emailData);
      toast.success('Thank you for your RSVP! Confirmation email has been sent.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        attending: true,
        guests: 1,
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="rsvp" 
      className="py-20 bg-white"
    >
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-16">RSVP</h2>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div>
            <label htmlFor="attending" className="block text-sm font-medium text-gray-700 mb-1">
              Will you attend?
            </label>
            <select
              id="attending"
              name="attending"
              value={formData.attending ? 'yes' : 'no'}
              onChange={(e) => setFormData(prev => ({ ...prev, attending: e.target.value === 'yes' }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message for the Couple
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-rose-500 text-white py-3 rounded-md transition-colors duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-600'
            }`}
          >
            {isSubmitting ? <LoadingSpinner /> : 'Send RSVP'}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default RSVP;