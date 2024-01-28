import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import getTranslation from "@/lib/i18n/getTranslation";
import { Locale } from '@/i18n';

type Props = {
  params: { locale: Locale };
};

export default async function Home({ params }: Props) {
  const t = await getTranslation(params.locale)

  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <p>This is a test for translation: { t('key') }</p>
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
