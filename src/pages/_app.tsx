import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';
import 'assets/main.scss';
import { Newsreader } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-newsreader',
  adjustFontFallback: false,
});

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const GA_id = process.env.NEXT_PUBLIC_GA_ID || '1VHTN8K5S9';

  return (
    <>
      <Bootstrap {...pageProps} />
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <div className={newsreader.variable}>
          <Component {...rest} />
        </div>
      </I18nProvider>
      <GoogleAnalytics gaId={`G-${GA_id}`} />
    </>
  );
}

export default App;
