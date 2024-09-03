import {
  GetStaticComponentProps,
  ImageField,
  LayoutServiceData,
  Link,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ChevronDown from 'assets/svg/ChevronDown';
import LinkIcon from 'assets/svg/LinkIcon';
import { ComponentProps } from 'lib/component-props';
import { MENU_ITEM } from 'lib/constants';
import useIsMobile from 'lib/customHooks/isMobile';
import { HeaderMenuQueryResult } from 'lib/graphql-queries/HeaderMenu';
import { getHeaderMenu } from 'lib/graphql-utils';
import { useEffect, useRef, useState } from 'react';
import NextImage from './atoms/NextImage';

type HeaderProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    LogoDesktop: ImageField;
    LogoMobile: ImageField;
  };
};

type MenuHeaderQueryProps = {
  menuItems: HeaderMenuQueryResult;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const componentProps = useComponentProps<MenuHeaderQueryProps>(props.rendering.uid);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const mobile = useIsMobile(1023);
  const navRef = useRef<HTMLUListElement>(null);

  const handleMenuItemClick = (menuItem: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.currentTarget.href.includes('#')) return;
    e.preventDefault();
    setActiveMenuItem(activeMenuItem === menuItem ? null : menuItem);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
      setActiveMenuItem(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (openMenu) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  }, [openMenu]);

  if (props.fields) {
    return (
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
            {/* <label htmlFor="language-select" className="text-white mr-[5px]">
            <span className="flex items-center">
              <Globe />
              <span className="pl-[12px]">Language:</span>
            </span>
          </label>
          <select id="language-select" name="language" className="" aria-label="Language options">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>

          <span className="w-[2px] h-[23px] bg-white mx-[30px] block"></span> */}
            <Link
              field={{
                href: 'https://www.baaqmd.gov/',
                title: 'Air District Main Site',
                target: '_blank',
              }}
              className="flex items-center text-white gap-[10px]"
            >
              <span>Air District Main Site</span>
              <LinkIcon theme="light" />
            </Link>
          </div>
        </section>
        <section className="container z-10 relative bg-white lg:!bg-transparent">
          <nav
            aria-labelledby="mainmenulabel"
            className="!flex justify-between items-center py-[15px]"
          >
            <section className="">
              <h2 id="mainmenulabel" className="hidden" aria-hidden="true">
                Main Menu
              </h2>
              <Link field={{ href: '/', title: 'Logo Mobile' }} className="block lg:hidden">
                <NextImage
                  field={props.fields.LogoMobile}
                  className="object-cover max-w-[200px]"
                  fetchPriority="high"
                  priority
                />
              </Link>
              <Link field={{ href: '/', title: 'Logo Desktop' }} className="hidden lg:block">
                <NextImage field={props.fields.LogoDesktop} fetchPriority="high" priority />
              </Link>
            </section>

            <section id="main-menu" className={openMenu ? 'open' : ''}>
              {mobile && (
                <button
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                  id="close"
                  className="relative flex justify-end pt-[10px] pr-[32px] text-[0.8rem] w-full lg:hidden"
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
              <ul className="mt-[80px] lg:mt-0" ref={navRef}>
                {componentProps?.menuItems?.headerMenu?.children?.results.map((item, index) => {
                  if (!item) return;
                  return (
                    <li
                      key={index}
                      className={`${activeMenuItem === item?.title?.jsonValue?.value ? 'active' : ''
                        }`}
                      onClick={() => handleMenuItemClick(item?.title?.jsonValue?.value ?? '')}
                    >
                      <a
                        href={item?.cta?.jsonValue?.value?.href || '#'}
                        target={item?.cta?.jsonValue?.value?.target}
                      >
                        <span>{item?.title?.jsonValue?.value}</span>
                        {item.hasChildren && (
                          <ChevronDown
                            className={`${activeMenuItem === item?.title?.jsonValue?.value ? 'active' : ''
                              }`}
                          />
                        )}
                      </a>
                      {item.hasChildren && (
                        <ul
                          className={`submenu ${activeMenuItem === item?.title?.jsonValue?.value ? 'show' : ''
                            }`}
                        >
                          {item.children.results.map((child, childIndex) => {
                            if (!child) return;
                            return (
                              <li key={childIndex}>
                                <a href={child?.cta?.jsonValue?.value?.href}>
                                  <NextImage
                                    className="rounded-full"
                                    field={child?.image?.jsonValue}
                                    fetchPriority="low"
                                    loading="lazy"
                                  />
                                  <div>
                                    <p className="menu-title">{child?.name}</p>
                                    <p className="menu-description">
                                      {child?.description?.jsonValue?.value}
                                    </p>
                                  </div>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              {mobile && (
                <section
                  className="languagebar relative px-[20px] mt-[30px] lg:hidden"
                  aria-labelledby="languagebar"
                >
                  <div className="">
                    {/* <label
                    htmlFor="language-select"
                    className="text-dark-blue lg:text-white mr-[5px] text-[14px] lg:text-[16px]"
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
                  </select> */}
                    <Link
                      field={{
                        href: 'https://www.baaqmd.gov/',
                        title: 'Air District Main Site',
                        target: '_blank',
                      }}
                      className="flex items-center text-dark-blue gap-[10px] p3"
                    >
                      <span>Air District Main Site</span>
                      <LinkIcon theme="dark" />
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
                  <span className="block">Menu</span>
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
  }
  return <></>;
};

export const getStaticProps: GetStaticComponentProps = async () => {
  const menuItems = await getHeaderMenu(MENU_ITEM);
  return {
    menuItems,
  };
};
