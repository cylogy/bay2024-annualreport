import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <header>
        <div id="header">
          <section id="mainNavigation" className="absolute w-full">
            <a href="#content" className="skip-main">
              Skip to content
            </a>
            <section
              id="languagebar"
              className="languagebar bg-powder-blue z-10 relative py-[15px] hidden lg:block"
              aria-label="languagebar"
            >
              <div className="container flex items-center justify-end">
                <a
                  href="https://www.baaqmd.gov"
                  className="flex items-center text-white gap-[10px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    alt="Logo Bay Area Air Quality"
                    loading="lazy"
                    width="24"
                    height="24"
                    className="object-contain object-center h-[24px] max-w-[100px] w-auto"
                    sizes="(min-width: 1024px) 100vw, (min-width: 768px) 40vw, 33vw"
                    src="/images/frame-4914-png.png"
                  />
                  <span>Air District Main Site</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 6C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89464 11.2652 8 11 8H5V19H16V13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11ZM20 3C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V9C21 9.26522 20.8946 9.51957 20.7071 9.70711C20.5196 9.89464 20.2652 10 20 10C19.7348 10 19.4804 9.89464 19.2929 9.70711C19.1054 9.51957 19 9.26522 19 9V6.414L10.707 14.707C10.5184 14.8892 10.2658 14.99 10.0036 14.9877C9.7414 14.9854 9.49059 14.8802 9.30518 14.6948C9.11977 14.5094 9.0146 14.2586 9.01233 13.9964C9.01005 13.7342 9.11084 13.4816 9.293 13.293L17.586 5H15C14.7348 5 14.4804 4.89464 14.2929 4.70711C14.1054 4.51957 14 4.26522 14 4C14 3.73478 14.1054 3.48043 14.2929 3.29289C14.4804 3.10536 14.7348 3 15 3H20Z"
                      fill="white"
                    ></path>
                  </svg>
                </a>
              </div>
            </section>
            <section className="container z-10 relative bg-white lg:!bg-transparent">
              <nav
                aria-labelledby="mainmenulabel"
                className="!flex justify-between items-center py-[15px]"
              >
                <section className="flex-none">
                  <h2 id="mainmenulabel" className="hidden" aria-hidden="true">
                    Main Menu
                  </h2>
                  <a className="block lg:hidden" href="/">
                    <span className="sr-only">Strategic Plan Home</span>
                    <Image
                      alt="Logo Bay Area Air Quality"
                      loading="lazy"
                      width="343"
                      height="54"
                      className="object-cover max-w-[200px]"
                      sizes="(min-width: 1024px) 100vw, (min-width: 768px) 40vw, 33vw"
                      src="/images/logo-black.png"
                    />
                    <p className="p3 text-dark-blue !font-bold pt-3">Strategic Plan</p>
                  </a>
                  <a className="hidden lg:block" href="/">
                    <span className="sr-only">Strategic Plan Home</span>
                    <div className="flex flex-row items-center">
                      <Image
                        alt="Logo Bay Area Air Quality"
                        fetchPriority="high"
                        width="154"
                        height="82"
                        sizes="(min-width: 1024px) 100vw, (min-width: 768px) 40vw, 33vw"
                        src="/images/baaqmd4white.png"
                        className="shrink-0 pr-5 border-r border-white border-solid"
                      />
                      <p className="pl-5 h6 text-white !font-bold">Strategic Plan</p>
                    </div>
                  </a>
                </section>
                <section id="main-menu" className=""></section>
              </nav>
            </section>
          </section>
        </div>
      </header>
    </div>
  );
}
