'use client';
import { useState } from 'react';
import { IoLanguage } from 'react-icons/io5';
import { i18nConfig } from '@/i18n';

export default function LanguageSwitch() {
  const [expanded, setExpanded] = useState(false);
  // TODO: button height multiplier = 2.25 rem

  return (
    <button
      className={`fixed bottom-12 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 ${
        expanded ? 'h-[9rem]' : ''
      }`}
      style={{ bottom: 'calc(5rem + 0.5rem)' }}
      onClick={() => setExpanded(!expanded)}
    >
      {expanded ? (
        <div className="flex flex-col space-y-2">
          {i18nConfig.locales.map((locale, index) => (
            <a
              className="hover:scale-125 transition-transform"
              href={`/${locale}`}
              key={index}
            >
              {locale.toUpperCase()}
            </a>
          ))}
        </div>
      ) : (
        <IoLanguage />
      )}
    </button>
  );
}
