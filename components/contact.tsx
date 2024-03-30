'use client';

import React, { useState } from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import SubmitBtn from './submit-btn';
import toast from 'react-hot-toast';
import { link } from '@/context/active-section-context';
import { sendEmail } from '@/actions/sendEmail';
import * as Yup from 'yup';
import { FormValues } from '@/types/form-values.type';

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
  const [inputValues, setInputValues] = useState({
    senderEmail: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    senderEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setInputValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormAction = async (formData: FormData) => {
    try {
      const validatedData: FormValues = await validationSchema.validate(
        Object.fromEntries(formData),
        {
          abortEarly: false,
        }
      );

      setIsSubmitting(true);

      const { data, error } = await sendEmail(validatedData);
      console.log(data, 'MAIL SENT SUCCESSFULLY!');
      setIsSubmitting(false);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Email sent successfully!');
      setInputValues({ senderEmail: '', message: '' });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        toast.error((error as Error).message);
      }
    }
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

      <>
        <p className="text-gray-700 -mt-6 dark:text-white/80">
          {t.description[0]}{' '}
          <a className="underline" href="mailto:neo.fanetti@gmail.com">
            {t.description[1]}
          </a>{' '}
          {t.description[2]} Ich werde mich innerhalb 14 Tagen melden.
        </p>

        <form
          className="mt-10 flex flex-col dark:text-black"
          action={async (formData) => handleFormAction(formData)}
        >
          <input
            className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
            name="senderEmail"
            type="email"
            value={inputValues.senderEmail}
            onChange={handleInputChange}
            required
            maxLength={500}
            placeholder={t.emailPlaceholder}
          />
          <textarea
            className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
            name="message"
            value={inputValues.message}
            onChange={handleInputChange}
            placeholder={t.messagePlaceholder}
            required
            maxLength={5000}
          />
          <SubmitBtn t={t.submitButton} pending={isSubmitting} />
        </form>
      </>
    </motion.section>
  );
}
