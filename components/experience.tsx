'use client';

import React from 'react';
import SectionHeading from './section-heading';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useSectionInView } from '@/lib/hooks';
import { useTheme } from '@/context/theme-context';

// icons
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import { IconType } from 'react-icons';
import { link } from '@/context/active-section-context';

type Props = {
  t: {
    links: link[];
    heading: string;
    experiences: any[];
  };
};

export default function Experience({ t }: Props) {
  const { ref } = useSectionInView(t.links[4].name);
  const { theme } = useTheme();

  const iconMapping = new Map<string, IconType>([
    ['CgWorkAlt', CgWorkAlt],
    ['FaReact', FaReact],
    ['LuGraduationCap', LuGraduationCap],
  ]);

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>{t.heading}</SectionHeading>
      <VerticalTimeline lineColor="">
        {t.experiences.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'none',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                textAlign: 'left',
                padding: '1.3rem 2rem',
                visibility: 'visible',
              }}
              contentArrowStyle={{
                borderRight:
                  theme === 'light'
                    ? '0.4rem solid #9ca3af'
                    : '0.4rem solid rgba(255, 255, 255, 0.5)',
              }}
              date={item.date}
              icon={React.createElement(iconMapping.get(item.icon) as IconType)}
              iconStyle={{
                background:
                  theme === 'light' ? 'white' : 'rgba(255, 255, 255, 0.15)',
                fontSize: '1.5rem',
                visibility: 'visible',
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
