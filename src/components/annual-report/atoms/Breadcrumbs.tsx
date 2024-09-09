import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function Breadcrumbs() {
  const { asPath } = useRouter();
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;

  const breadcrumbs = useMemo(() => {
    const nestedPath = asPath
      .split('?')[0]
      .split('/')
      .filter((v) => v.length > 0);

    const crumbs = nestedPath.map((path) =>
      path.split('#')[0].replace('and', '&').split('-').join(' ')
    );

    return [...crumbs.filter((crumb) => crumb !== '')];
  }, [asPath]);

  if (asPath === '/' || isPageEditing || breadcrumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumbs"
      className="container py-[30px] lg:pt-[3.75rem] lg:pb-0 bg-soft-white"
    >
      <ol className="flex items-center gap-1.5 text-dark-blue capitalize p3 py-2.5">
        <li className="flex items-center gap-1.5">
          <a href="/">Home</a>
          <span>/</span>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          const isCurrentPage = i === breadcrumbs.length - 1;
          return (
            <li
              key={breadcrumb}
              className={`flex items-center gap-1.5 whitespace-nowrap ${
                isCurrentPage ? 'overflow-hidden ' : ''
              }`}
            >
              <span
                className={isCurrentPage && breadcrumbs.length > 1 ? '!font-bold' : 'text-gray-600'}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {breadcrumb}
              </span>
              {!isCurrentPage && <span>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
