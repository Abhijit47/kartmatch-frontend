'use server';

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY); // Debugging line

export async function sendEmail() {
  const msg = {
    to: 'test@example.com', // Change to your recipient
    from: 'test@example.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    const result = await sgMail.send(msg);
    console.log('Email sent', result);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }

  return { success: true, message: 'Email sent successfully' };
}
