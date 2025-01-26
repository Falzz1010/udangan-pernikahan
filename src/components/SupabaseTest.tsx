import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseTest = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    async function checkConnection() {
      try {
        console.log('Checking Supabase connection...');
        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
        
        // Test query to check if table exists and is accessible
        const { data, error } = await supabase
          .from('rsvp_responses')
          .select('id')
          .limit(1);
        
        if (error) {
          console.error('Query error:', error);
          throw error;
        }
        
        console.log('Connection successful!');
        console.log('Test query result:', data);
        setStatus('connected');
      } catch (error) {
        console.error('Supabase connection error:', error);
        setStatus('error');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-white">
      <p className="flex items-center gap-2">
        <span>Database Status:</span>
        {status === 'checking' && (
          <span className="text-yellow-500">Checking connection...</span>
        )}
        {status === 'connected' && (
          <span className="text-green-500">Connected successfully!</span>
        )}
        {status === 'error' && (
          <span className="text-red-500">Connection error</span>
        )}
      </p>
    </div>
  );
};

export default SupabaseTest;