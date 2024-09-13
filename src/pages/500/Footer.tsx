import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div id="footer">
        <div className="container">
          <div>
            <nav>
              <div>
                <Image
                  alt="Logo Bay Area Air Quality"
                  loading="lazy"
                  width="343"
                  height="54"
                  className="logo-footer"
                  sizes="(min-width: 1024px) 100vw, 40vw"
                  src="/images/logo-white.png"
                />
                <p>
                  375 Beale Street, Suite 600
                  <br />
                  San Francisco, CA 9
                </p>
                <p className="phone">415-749-5000</p>
              </div>
              <div></div>
              <div></div>
              <div></div>
            </nav>
            <section className="copy">
              <p>© Copyright 2024 Bay Area Air Quality Management District</p>
              <ul>
                <li>
                  <a
                    href="https://www.baaqmd.gov/en/about-the-air-district/diversity-equity-and-inclusion/accessibility"
                    target="_blank"
                  >
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="https://www.baaqmd.gov/en/online-services/terms-of-use" target="_blank">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.baaqmd.gov/en/online-services/privacy-policy"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.baaqmd.gov/en/online-services/social-media-policy"
                    target="_blank"
                  >
                    Social Media Policy
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </footer>
  );
}
