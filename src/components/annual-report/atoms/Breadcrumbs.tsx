import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Breadcrumbs() {
  const [Breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const { asPath } = useRouter();

  useEffect(() => {
    const nestedPath = asPath
      .split('?')[0]
      .split('/')
      .filter((v) => v.length > 0);

    const crumbs = nestedPath.map((path) =>
      path.split('#')[0].replace('and', '&').split('-').join(' ')
    );

    setBreadcrumbs([...crumbs.filter((crumb) => crumb !== '')]);
  }, [asPath]);

  if (asPath === '/') return null;

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
        {Breadcrumbs.map((breadcrumb, i) => {
          const isCurrentPage = i === Breadcrumbs.length - 1;
          return (
            <li
              key={breadcrumb}
              className={`flex items-center gap-1.5 text-nowrap ${
                isCurrentPage ? 'overflow-hidden ' : ''
              }`}
            >
              <span
                className={isCurrentPage && Breadcrumbs.length > 1 ? '!font-bold' : 'text-gray-500'}
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
