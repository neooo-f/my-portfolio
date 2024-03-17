'use client';

import React from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from './submit-btn';
import toast from 'react-hot-toast';

type Props = {
  t: {
    heading: string;
    description: string[];
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitButton: {
      name: string;
    };
  };
};

export default function Contact({ t }: Props) {
  const { ref } = useSectionInView('Contact');

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{t.heading}</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        {t.description[0]}{' '}
        <a className="underline" href="mailto:example@gmail.com">
          {t.description[1]}
        </a>{' '}
        {t.description[2]}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success('Email sent successfully!');
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={t.emailPlaceholder}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder={t.messagePlaceholder}
          required
          maxLength={5000}
        />
        <SubmitBtn t={t.submitButton} />
      </form>
    </motion.section>
  );
}
