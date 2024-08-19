/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';
import ScrollToTop from 'components/annual-report/atoms/ScrollToTop';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const toTop = layoutData.sitecore.route?.fields?.ToTop as Field<boolean>;

  console.log('To Top:' + toTop.value);

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <meta
          name="description"
          content="The 2024-2029 Strategic Plan is centered on four primary goals: achieve impact, advance environmental justice, foster cohesion and inclusion, and maintain an effective, accountable, and customer-oriented organization."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <header>
          <div id="header">
            {route && (
              <Placeholder name="headless-header" rendering={route} layoutData={layoutData} />
            )}
          </div>
        </header>
        <main>
          <div id="content">
            {route && (
              <Placeholder name="headless-main" rendering={route} layoutData={layoutData} />
            )}
          </div>
        </main>
        <footer>
          <div id="footer">
            {route && (
              <Placeholder name="headless-footer" rendering={route} layoutData={layoutData} />
            )}
          </div>
        </footer>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Layout;
