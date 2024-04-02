import Header from '@/components/header';
import '../globals.css';
import { Inter } from 'next/font/google';
import ActiveSectionContextProvider from '@/context/active-section-context';
import Footer from '@/components/footer';
import ThemeSwitch from '@/components/theme-switch';
import ThemeContextProvider from '@/context/theme-context';
import { Toaster } from 'react-hot-toast';
import { Locale, i18nConfig } from '@/i18n';
import getTranslation from '@/lib/i18n/getTranslation';
import LanguageSwitch from '@/components/language-switch';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Neo Fanetti',
  description: 'developer portfolio',
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale: Locale) => ({ locale: locale }));
}

type Props = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

export default async function RootLayout({ children, params }: Props) {
  const t = await getTranslation(params.locale);

  return (
    <html lang={params.locale} className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
        <ThemeContextProvider>
          <ActiveSectionContextProvider
            t={{
              links: t('links') as [],
            }}
          >
            <Header
              t={{
                links: t('links') as [],
              }}
            />
            {children}
            <Footer
              t={{
                title: t('footer.title') as string,
                legal: t('footer.legal') as string,
                descreption: t('footer.descreption') as string[],
                legalModal: {
                  header: t('legalModal.header') as string,
                  body: t('legalModal.body') as string[],
                  footer: t('legalModal.footer') as string[],
                },
              }}
            />

            <Toaster position="top-right" />
            <LanguageSwitch />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
