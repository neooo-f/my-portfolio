import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Intro from '@/components/intro';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';
import Skills from '@/components/skills';
import getTranslation from '@/lib/i18n/getTranslation';
import { Locale } from '@/i18n';

type Props = {
  params: { locale: Locale };
};

export default async function Home({ params }: Props) {
  const t = await getTranslation(params.locale);

  return (
    <main className="flex flex-col items-center px-4">
      <Intro
        t={{
          links: t('links') as any[],
          description: t('intro.description') as string[],
          contact: t('intro.contactMe') as string,
          download: t('intro.downloadCV') as string,
        }}
      />
      <SectionDivider />
      <About
        t={{
          links: t('links') as any[],
          heading: t('about.heading') as string,
          description: t('about.description') as string[],
        }}
      />
      <Projects
        t={{
          links: t('links') as any[],
          heading: t('projects.heading') as string,
          projects: t('projects.data') as string[],
        }}
      />
      <Skills
        t={{
          links: t('links') as any[],
          heading: t('skills.heading') as string,
          skills: t('skills.data') as string[],
        }}
      />
      <Experience
        t={{
          links: t('links') as any[],
          heading: t('experience.heading') as string,
          experiences: t('experience.data') as [],
        }}
      />
      <Contact
        t={{
          links: t('links') as any[],
          heading: t('contact.heading') as string,
          description: t('contact.descreption') as string[],
          emailPlaceholder: t('contact.placeholder.email') as string,
          messagePlaceholder: t('contact.placeholder.message') as string,
          submitButton: {
            name: t('submitButton.name') as string,
          },
        }}
      />
    </main>
  );
}
