import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Intro from '@/components/intro';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';
import Skills from '@/components/skills';
import ThemeSwitch from '@/components/theme-switch';
import getTranslation from '@/lib/i18n/getTranslation';

export default async function Home() {
  const t = await getTranslation('de');

  return (
    <main className="flex flex-col items-center px-4">
      <Header
        t={{
          links: t('links') as [],
        }}
      />
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
          error: {
            email: {
              invalid: t('contact.error.email.invalid') as string,
              required: t('contact.error.email.required') as string,
            },
            message: {
              required: t('contact.error.message.required') as string,
            },
          },
          successAlert: {
            message: t('contact.success') as string,
          },
          submitButton: {
            name: t('submitButton.name') as string,
          },
        }}
      />
      <Footer
        t={{
          title: t('footer.title') as string,
          legal: t('footer.legal') as string,
          descreption: t('footer.descreption') as string[],
          legalModal: {
            header: t('legalModal.header') as string,
            body: t('legalModal.body') as string[],
          },
        }}
      />
      <ThemeSwitch />
    </main>
  );
}
