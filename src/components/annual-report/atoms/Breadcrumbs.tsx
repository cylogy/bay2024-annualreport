import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Breadcrumbs() {
  const { asPath } = useRouter();
  const [Breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    const nestedPath = asPath
      .split('?')[0]
      .split('/')
      .filter((v) => v.length > 0);
    const crumbs = nestedPath.map((path) => {
      // const href = '/' + nestedPath.slice(0, idx + 1).join('/').split('#')[0];
      const text = path.split('#')[0].replace('and', '&').split('-').join(' ');

      return text;
    });

    setBreadcrumbs([...crumbs.filter((crumb) => crumb !== '')]);
  }, [asPath]);

  return (
    <nav aria-label="Breadcrumbs" className="container py-2.5">
      <ol className="flex items-center gap-1.5 text-dark-blue capitalize p3">
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
                className={isCurrentPage ? '!font-bold' : 'text-gray-500'}
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
