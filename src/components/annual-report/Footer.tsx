import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';

interface Fields {
  Footer: Field<string>;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = ({ fields }: FooterProps): JSX.Element => {
  const [Footer] = useState(fields.Footer.value);

  /* useEffect(() => {
    const customFooter = (html: string) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const spansToRemove = doc.querySelectorAll(
        '.icon-inline.icon-file-pdf-o, .document-meta-data'
      );
      spansToRemove.forEach((span) => span.remove());

      return doc.body.innerHTML.toString();
    };

    setFooter(customFooter(fields.Footer.value)?.replace('href="/http', 'href="http'));
  }, [fields]); */

  return (
    <div className="container">
      {fields ? (
        <div dangerouslySetInnerHTML={{ __html: Footer }} />
      ) : (
        <span className="is-empty-hint">Rich text</span>
      )}
    </div>
  );
};
