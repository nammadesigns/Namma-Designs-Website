import type { NextApiRequest, NextApiResponse } from 'next';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ResponseData = {
  success?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body as ContactFormData;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Submit to Formspree
    const response = await fetch('https://formspree.io/f/xovlgyzr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Contact Form Submission from ${name}`,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Formspree error:', responseData);
      return res.status(response.status).json({
        error: 'Failed to submit form. Please try again.'
      });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
}