import {
  GetStaticComponentProps,
  ImageField,
  LayoutServiceData,
  useComponentProps,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { HeaderMenuQueryResult } from 'lib/graphql-queries/HeaderMenu';
import { getHeaderMenu } from 'lib/graphql-utils';
import { MENU_ITEM } from 'lib/constants';
import { useEffect, useState } from 'react';
import Globe from 'assets/svg/Globe';
import LinkIcon from 'assets/svg/LinkIcon';
import ChevronDown from 'assets/svg/ChevronDown';
import useIsMobile from 'lib/customHooks/isMobile';

type HeaderProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    logoDesktop: ImageField;
    logoMobile: ImageField;
  };
};

type MenuHeaderQueryProps = {
  menuItems: HeaderMenuQueryResult;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const componentProps = useComponentProps<MenuHeaderQueryProps>(props.rendering.uid);

  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const mobile = useIsMobile(1024);
  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(activeMenuItem === menuItem ? null : menuItem);
  };

  useEffect(() => {
    const body = document.body;
    if (openMenu) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  }, [openMenu]);

  const skipToContent = () => {
    const contentElement = document.getElementById('content');
    const firstElement = contentElement?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    if (!firstElement) return;
    setTimeout(() => {
      firstElement.focus();
    }, 0);
  };

  console.log(componentProps);

  return (
    <section id="mainNavigation" className="absolute w-full">
      <section
        id="languagebar"
        className="languagebar bg-powder-blue z-10 relative py-[15px] hidden md:block"
        aria-labelledby="languagebar"
      >
        <div className="container flex items-center justify-end">
          <label htmlFor="language-select" className="text-white mr-[5px]">
            <span className="flex items-center">
              <Globe />
              <span className="pl-[12px]">Language:</span>
            </span>
          </label>
          <select id="language-select" name="language" className="" aria-label="Language options">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>

          <span className="w-[2px] h-[23px] bg-white mx-[30px] block"></span>
          <Link
            field={{ href: '/', title: 'Air District Main Site' }}
            className="flex item-center text-white gap-[12px]"
          >
            <span>Air District Main Site</span>
            <LinkIcon />
          </Link>
        </div>
      </section>
      <section className="container z-10 relative bg-white md:!bg-transparent">
        <nav
          aria-labelledby="mainmenulabel"
          className="!flex justify-between items-center py-[15px]"
        >
          <section className="">
            <button type="button" id="skip" onClick={skipToContent}>
              Skip to content
            </button>
            <h2 id="mainmenulabel" className="hidden" aria-hidden="true">
              Main Menu
            </h2>
            {mobile && (
              <Link field={{ href: '/', title: 'Mobile logo' }} className="">
                <img
                  src="/images/logo-black.png"
                  alt="Bay Area Air Quality Logo"
                  className="object-cover max-w-[200px]"
                />
              </Link>
            )}
            {!mobile && (
              <Link field={{ href: '/', title: 'Desktop logo' }}>
                <img src="/images/logo-white.png" alt="Bay Area Air Quality Logo" className="" />
              </Link>
            )}
          </section>

          <section id="main-menu" className={openMenu ? 'open' : ''}>
            {mobile && (
              <button
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
                id="close"
                className="relative flex justify-end pt-[10px] pr-[32px] text-[30px] w-full md:hidden"
              >
                Close
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="10.8712"
                    width="15.2734"
                    height="1.69705"
                    rx="0.848523"
                    transform="rotate(-45 0 10.8712)"
                    fill="white"
                  />
                  <rect
                    y="10.8712"
                    width="15.2734"
                    height="1.69705"
                    rx="0.848523"
                    transform="rotate(-45 0 10.8712)"
                    fill="#253E7B"
                  />
                  <rect
                    x="1.19922"
                    y="0.0715504"
                    width="15.2734"
                    height="1.69705"
                    rx="0.848523"
                    transform="rotate(45 1.19922 0.0715504)"
                    fill="white"
                  />
                  <rect
                    x="1.19922"
                    y="0.0715504"
                    width="15.2734"
                    height="1.69705"
                    rx="0.848523"
                    transform="rotate(45 1.19922 0.0715504)"
                    fill="#253E7B"
                  />
                </svg>
              </button>
            )}
            <ul className="mt-[80px] md:mt-0">
              {componentProps?.menuItems?.headerMenu?.children?.results.map((item, index) => (
                <li
                  key={index}
                  className={`${activeMenuItem === item.title.jsonValue.value ? 'active' : ''}`}
                  onClick={() => handleMenuItemClick(item.title.jsonValue.value)}
                >
                  <a
                    href={item.cta.jsonValue.value.href || '#'}
                    target={item.cta.jsonValue.value.target}
                  >
                    <span>{item.title.jsonValue.value}</span>
                    {item.hasChildren && (
                      <ChevronDown
                        className={`${
                          activeMenuItem === item.title.jsonValue.value ? 'active' : ''
                        }`}
                      />
                    )}
                  </a>
                  {item.hasChildren && (
                    <ul
                      className={`submenu ${
                        activeMenuItem === item.title.jsonValue.value ? 'show' : ''
                      }`}
                    >
                      {item.children.results.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link field={child.cta.jsonValue.value}>
                            <img
                              className="rounded-full"
                              src={child.image.jsonValue.value.src}
                              alt={child.image.jsonValue.value.alt}
                            />
                            <div>
                              <p className="menu-title">{child.name}</p>
                              <p className="menu-description">
                                {child.description.jsonValue.value}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {mobile && (
              <section
                className="languagebar relative px-[20px] mt-[30px] md:hidden"
                aria-labelledby="languagebar"
              >
                <div className="">
                  <label
                    htmlFor="language-select"
                    className="text-dark-blue md:text-white mr-[5px] text-[14px] md:text-[16px]"
                  >
                    Language:
                  </label>
                  <select
                    id="language-select"
                    name="language"
                    className=""
                    aria-label="Language options"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                  <Link
                    field={{ href: '/', title: 'Air District Main Site' }}
                    className="mt-[25px] text-dark-blue md:text-white w-full block text-[14px] md:text-[16px]"
                  >
                    Air District Main Site
                  </Link>
                </div>
              </section>
            )}
          </section>

          {mobile && (
            <div
              id="hamburguerContainer"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              <label htmlFor="hamburgerInput" hidden></label>
              <input className="checkbox" type="checkbox" name="" id="hamburgerInput" />
              <div className="menu-mobile-wrapper">
                <span className="block text-[0.8rem]">Menu</span>
                <div className="hamburger-lines">
                  <span className="line line1"></span>
                  <span className="line line2"></span>
                  <span className="line line3"></span>
                </div>
              </div>
            </div>
          )}
        </nav>
      </section>
    </section>
  );
};

export const getStaticProps: GetStaticComponentProps = async () => {
  const menuItems = await getHeaderMenu(MENU_ITEM);
  return {
    menuItems,
  };
};
