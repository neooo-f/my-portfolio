'use client';

import React, { useState } from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
// import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from './submit-btn';
import toast from 'react-hot-toast';
import { link } from '@/context/active-section-context';
import { testLol } from '@/actions/testLol';

type Props = {
  t: {
    links: link[];
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
  const { ref } = useSectionInView(t.links[t.links.length - 1].name);

  const [formData, setFormData] = useState({
    message: '',
    senderMail: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // const data = await sendEmail(formData);
      // const response = await fetch(
      //   'https://jsonplaceholder.typicode.com/todos/1'
      // );
      // console.log(await response.json());
      const data = await testLol();
      console.log(data);

      console.log(formData);
      toast.success('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        onSubmit={handleSubmit}
      >
        {/* <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          // const { data, error } = await sendEmail(formData);
          const data = await sendEmail(formData);
          console.log(data);

          // if (error) {
          //   toast.error(error);
          //   return;
          // }

          toast.success('Email sent successfully!');
        }}
      > */}
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderMail"
          value={formData.senderMail}
          onChange={handleChange}
          type="email"
          required
          maxLength={500}
          placeholder={t.emailPlaceholder}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t.messagePlaceholder}
          required
          maxLength={5000}
        />
        <SubmitBtn t={t.submitButton} />
      </form>
    </motion.section>
  );
}
