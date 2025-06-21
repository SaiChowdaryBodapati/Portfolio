import emailjs from '@emailjs/browser';

// EmailJS configuration - use environment variables in production
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // Check if EmailJS is properly configured
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.warn('EmailJS not configured. Using fallback mode.');
    return sendContactEmailFallback(formData);
  }

  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Saitej Chowdary Bodapati',
        reply_to: formData.email,
        subject: `Portfolio Contact from ${formData.name}`,
      },
      EMAILJS_PUBLIC_KEY
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Fallback to development mode if EmailJS fails
    if (import.meta.env.DEV) {
      console.log('Falling back to development mode');
      return sendContactEmailFallback(formData);
    }
    
    return {
      success: false,
      message: 'Failed to send message. Please try again or contact me directly at saitej.bodapati@example.com'
    };
  }
};

// Fallback function for development/testing
export const sendContactEmailFallback = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For development, just log the data
  console.log('Contact form submission (Development Mode):', {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    timestamp: new Date().toISOString()
  });
  
  return {
    success: true,
    message: 'Message sent successfully! (Development mode - check console for details)'
  };
};

// Email validation helper
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Rate limiting helper
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN = 5000; // 5 seconds

export const canSubmitForm = (): boolean => {
  const now = Date.now();
  if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
    return false;
  }
  lastSubmissionTime = now;
  return true;
}; 