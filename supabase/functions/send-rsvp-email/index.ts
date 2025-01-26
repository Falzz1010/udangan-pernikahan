import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, name, attending, guests, message } = await req.json()

    // For testing, always send to your verified email
    const testEmail = 'h29614713@gmail.com'

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Menggunakan alamat default Resend
        to: [testEmail], // Selalu kirim ke email Anda untuk testing
        subject: 'Wedding RSVP Confirmation',
        html: `
          <h2>Thank you for your RSVP!</h2>
          <p>Dear ${name},</p>
          <p>We have received your RSVP with the following details:</p>
          <ul>
            <li>Original email: ${to}</li>
            <li>Attending: ${attending ? 'Yes' : 'No'}</li>
            <li>Number of guests: ${guests}</li>
            ${message ? `<li>Your message: "${message}"</li>` : ''}
          </ul>
          <p>We look forward to celebrating with you!</p>
        `
      })
    });

    const emailData = await emailResponse.json();
    console.log('Resend API response:', emailData);

    if (!emailResponse.ok) {
      throw new Error(emailData.message || 'Failed to send email');
    }

    return new Response(
      JSON.stringify({ success: true, data: emailData }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
      },
    )
  }
})
