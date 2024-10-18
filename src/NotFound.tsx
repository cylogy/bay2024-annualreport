import Head from 'next/head';
import Header from './pages/500/Header';
import Hero from './pages/500/Hero';
import Footer from './pages/500/Footer';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: Page not found</title>
    </Head>
    <Header />
    <Hero title="Page not found" message="We can´t seem to find the page you are looking for." />
    <div className="py-[36px] lg:py-[96px]">
      <div className="component rich-text container-anchors  col-12">
        <div className="component-content rich-text-container lg:max-w-[879px] text-dark-blue">
          <h2 className="pb-16">404. Oops, nothing here.</h2>
          <h5>Here are some helpful links instead:</h5>
          <ul>
            <li>
              <a href="https://strategicplan.baaqmd.gov/">Home Page</a>
            </li>
            <li>
              <a href="https://strategicplan.baaqmd.gov/about/strategic-plan">
                Strategic Plan Overview and Scope
              </a>
            </li>
            <li>
              <a href="https://strategicplan.baaqmd.gov/contact-us">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default NotFound;
