'use client';

import React, { useEffect, useState } from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import SubmitBtn from './submit-btn';
import { link } from '@/context/active-section-context';
import { sendEmail } from '@/actions/sendEmail';
import * as Yup from 'yup';
import { FormValues } from '@/types/form-values.type';
import SuccessAlert from './success-alert';
import ErrorAlert from './error-alert';

type Props = {
  t: {
    links: link[];
    heading: string;
    description: string[];
    emailPlaceholder: string;
    messagePlaceholder: string;
    error: {
      email: {
        invalid: string;
        required: string;
      };
      message: {
        required: string;
      };
    };
    successAlert: {
      message: string;
    };
    submitButton: {
      name: string;
    };
  };
};

export default function Contact({ t }: Props) {
  const { ref } = useSectionInView(t.links[t.links.length - 1].name);

  // keep track of values to delete after submitting and passing to server
  const [inputValues, setInputValues] = useState<FormValues>({
    senderEmail: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [displayError, setDisplayError] = useState<string | undefined>(
    undefined
  );

  // let success alert dissapear after 6 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [showSuccessAlert]);

  const validationSchema = Yup.object().shape({
    senderEmail: Yup.string()
      .email(t.error.email.invalid)
      .required(t.error.email.required),
    message: Yup.string().required(t.error.message.required),
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

  const handleFormAction = async (formData: FormValues) => {
    try {
      console.log(formData);

      const validatedData: FormValues = await validationSchema.validate(
        inputValues,
        {
          abortEarly: false,
        }
      );

      setIsSubmitting(true);
      const { data, error } = await sendEmail(validatedData);
      setIsSubmitting(false);

      if (error) {
        setDisplayError(error);
        setShowErrorAlert(true);
        return;
      }

      setShowErrorAlert(false);
      setShowSuccessAlert(true);
      setInputValues({ senderEmail: '', message: '' });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let validationErrors: string[] = [];
        error.inner.forEach((validationError) => {
          validationErrors.push(validationError.message);
        });
        setDisplayError(validationErrors.join(', '));
        setShowErrorAlert(true);
      } else {
        setDisplayError((error as Error).message);
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
          <a className="underline" href="mailto:info.neo.fanetti@gmail.com">
            {t.description[1]}
          </a>{' '}
          {t.description[2]}
        </p>

        <form
          className="mt-10 flex flex-col dark:text-black"
          onSubmit={async (event) => {
            event.preventDefault();
            await handleFormAction(inputValues);
          }}
        >
          {showSuccessAlert && <SuccessAlert t={t.successAlert} />}
          {showErrorAlert && <ErrorAlert message={displayError || 'Error'} />}
          <input
            className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
            name="senderEmail"
            value={inputValues.senderEmail}
            onChange={handleInputChange}
            maxLength={500}
            placeholder={t.emailPlaceholder}
          />
          <textarea
            className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
            name="message"
            value={inputValues.message}
            onChange={handleInputChange}
            placeholder={t.messagePlaceholder}
            maxLength={5000}
          />
          <SubmitBtn t={t.submitButton} pending={isSubmitting} />
        </form>
      </>
    </motion.section>
  );
}
