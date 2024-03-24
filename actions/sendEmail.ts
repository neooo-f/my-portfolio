'use server';

import { createTransport } from 'nodemailer';
import { validateString, getErrorMessage } from '@/lib/utils';
import { emailResponse } from '@/email/contact-form-email';

export const sendEmail = async (formData: {
  message: string;
  senderMail: string;
}) => {
  // formData: FormData

  // const senderEmail = formData.get('senderEmail');
  // const message = formData.get('message');
  const senderEmail = formData.senderMail;
  const message = formData.message;

  const transporter = createTransport({
    host: 'smtp.gmail.com', // Ihr SMTP-Host
    port: 587, // Ihr SMTP-Port
    secure: false, // true für SSL, false für TLS
    auth: {
      user: 'neo.fanetti@gmail.com', // Ihre E-Mail-Adresse
      pass: process.env.EMAIL_PASSWORD, // Ihr E-Mail-Passwort
    },
  });

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: 'Invalid sender email',
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: 'Invalid message',
    };
  }

  console.log(sendEmail, message);
  let data;
  try {
    data = await transporter.sendMail({
      from: 'neo.fanetti@gmail.com',
      to: 'neo.fanetti@gmail.com',
      subject: 'Message from contact form', // Betreff
      html: emailResponse(message, senderEmail),
      // text: 'Dies ist eine Test-E-Mail von Nodemailer mit TLS.', // Inhalt
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
