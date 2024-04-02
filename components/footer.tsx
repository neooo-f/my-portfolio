'use client';

import React, { useState } from 'react';
import LegalModal from './legal-modal';

type Props = {
  t: {
    title: string;
    legal: string;
    descreption: string[];
    legalModal: {
      header: string;
      body: string[];
      footer: string[];
    };
  };
};

export default function Footer({ t }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; {t.title}{' '}
        <button className="underline" onClick={() => setModalOpen(!modalOpen)}>
          {t.legal}
        </button>
      </small>
      <p className="text-xs">
        <span className="font-semibold">{t.descreption[0]}</span>{' '}
        {t.descreption[1]}
      </p>
      <LegalModal
        t={t.legalModal}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </footer>
  );
}
