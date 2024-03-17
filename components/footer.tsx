import React from 'react';

type Props = {
  t: {
    title: string;
    descreption: string[];
  };
};

export default function Footer({ t }: Props) {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">&copy; {t.title}</small>
      <p className="text-xs">
        <span className="font-semibold">{t.descreption[0]}</span>{' '}
        {t.descreption[1]}
      </p>
    </footer>
  );
}
