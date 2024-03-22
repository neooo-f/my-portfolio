'use client';

import React from 'react';
import SectionHeading from './section-heading';
// import { projectsData } from "@/lib/data";
import Project from './project';
import { useSectionInView } from '@/lib/hooks';
import { link } from '@/context/active-section-context';

type Props = {
  t: {
    links: link[];
    heading: string;
    projects: any[];
  };
};

export default function Projects({ t }: Props) {
  const { ref } = useSectionInView(t.links[2].name, 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>{t.heading}</SectionHeading>
      <div>
        {t.projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
            <h1></h1>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
