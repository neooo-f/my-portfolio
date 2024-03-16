"use client";

import React from "react";
import SectionHeading from "./section-heading";
// import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

type Props = {
  t: {
    heading: string;
    projects: any[];
  }
}

export default function Projects({ t }: Props) {
  const { ref } = useSectionInView("Projects", 0.5);

  console.log(JSON.parse(t.projects[0]));

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>{ t.heading }</SectionHeading>
      <div>
        {t.projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...JSON.parse(project)} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
