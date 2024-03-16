import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import getTranslation from "@/lib/i18n/getTranslation";
import { Locale } from '@/i18n';
import { getTranslationObjectValuesAsArray } from "@/lib/utils";

type Props = {
  params: { locale: Locale };
};

export default async function Home({ params }: Props) {
  const t = await getTranslation(params.locale);

  return (
    <main className="flex flex-col items-center px-4">
      <Intro t={{
        description: getTranslationObjectValuesAsArray(t, 'intro.description.part', 9),
        contact: t('intro.contactMe'),
        download: t('intro.downloadCV')
      }} />
      <SectionDivider />
      <About t={{
        heading: t('about.heading'),
        description: getTranslationObjectValuesAsArray(t, 'about.description.part', 13)
      }} />
      <Projects t={{
        heading: t('projects.heading'),
        projects: getTranslationObjectValuesAsArray(t, 'projects.data.project', 2)
      }} />
      <Skills t={{
        heading: t('skills.heading'),
        skills: JSON.parse(t('skills.data'))
      }} />
      <Experience />
      <Contact />
    </main>
  );
}
