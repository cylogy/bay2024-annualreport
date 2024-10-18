import Head from 'next/head';
import Header from './500/Header';
import Hero from './500/Hero';
import Footer from './500/Footer';

const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: That's an error</title>
    </Head>
    <Header />
    <Hero
      title="Uh oh!"
      message="Well this is unexpected. An error has occurred and we're working to fix the problem. We'll
          be up and running shortly."
    />
    <div className="container my-28 text-dark-blue">
      <div className="max-w-[50rem] space-y-4">
        <h2>500. That's an error.</h2>
        <p>
          The server encountered an error and could not complete your request. If the problem
          persists, please report your problem and mention this error message and the query that
          caused it. That's all we know.
        </p>
      </div>
    </div>
    <Footer />
  </>
);

export default ServerError;
