'use server';

import { createTransport } from 'nodemailer';
import { validateString, getErrorMessage } from '@/lib/utils';
import { render } from '@react-email/render';
import { ContactFormEmail } from '@/email/contact-form-email';
import { FormValues } from '@/types/form-values.type';

export const sendEmail = async (formData: FormValues) => {
  const senderEmail = formData.senderEmail;
  const message = formData.message;
  // const senderEmail = formData
  //   .get('senderEmail')
  //   ?.toString()
  //   .replace(/<[^>]*>?/gm, '');

  // const message = formData
  //   .get('message')
  //   ?.toString()
  //   .replace(/<[^>]*>?/gm, '');

  const transporter = createTransport({
    host: process.env.SMTP_HOST, // SMTP-Host
    port: Number(process.env.SMTP_PORT), // SMTP-Port
    secure: Boolean(process.env.USE_SSL), // true = SSL, false = TLS
    auth: {
      user: process.env.EMAIL_ADDRESS, // sender address
      pass: process.env.EMAIL_APP_PASSWORD, // app password
    },
  });

  // server-side validation
  if (!validateString(senderEmail, 110)) {
    return {
      error: 'Invalid sender email',
    };
  }
  if (!validateString(message, 3000)) {
    return {
      error: 'Invalid message',
    };
  }

  const emailResponse = render(ContactFormEmail({ message, senderEmail }), {
    pretty: true,
  });

  let data;
  try {
    data = await transporter.sendMail({
      to: 'neo.fanetti@me.com',
      subject: 'Message from contact form',
      html: emailResponse,
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
