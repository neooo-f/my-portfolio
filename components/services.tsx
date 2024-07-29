'use client';

import React from 'react';
import SectionHeading from './section-heading';
import { useSectionInView } from '@/lib/hooks';
import { link } from '@/context/active-section-context';

type Props = {
  t: {
    links: link[];
    heading: string;
  };
};

export default function Services({ t }: Props) {
  // TODO: change
  const { ref } = useSectionInView(t.links[2].name, 0.5);

  return (
    <section ref={ref} id="services" className="scroll-mt-28 mb-28">
      <SectionHeading>{t.heading}</SectionHeading>
      <div>
        {/* 
            3 Icons (Desktop, Mobile and Web) with Naming
            and under the icons a short description that i make
            professional and custom websites.

            Maybe restructure complete website to promote my services with
            different routes.
        */}
      </div>
    </section>
  );
}
