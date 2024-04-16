'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

type Props = {
  t: {
    header: string;
    body: string[];
  };
  isOpen: boolean;
  onClose: () => void;
};

export default function LegalModal({ t, isOpen, onClose }: Props) {
  // disables scrolling in the background while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <motion.div
      id="default-modal"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        visibility: isOpen ? 'visible' : 'hidden',
      }}
      className={`z-[1000] flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 bg-gray-800 bg-opacity-50`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t.header}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-xl font-semibold leading-relaxed text-gray-900 dark:text-white">
              {t.body[0]}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{t.body[1]}</span> <br />
              <span>
                {t.body[2]}{' '}
                <a
                  className="underline"
                  href="mailto:info.neo.fanetti@gmail.com"
                >
                  {t.body[3]}
                </a>
              </span>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{t.body[4]}</span> <br />
              <span>{t.body[5]}</span>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{t.body[6]}</span> <br />
              <span>{t.body[7]}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
