import { Field, RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useState } from 'react';

interface Fields {
  Footer: Field<string>;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = ({ fields }: FooterProps): JSX.Element => {
  const [Footer, setFooter] = useState(fields.Footer.value);
  const {
    sitecoreContext: { pageEditing },
  } = useSitecoreContext();

  useEffect(() => {
    if (pageEditing) return;
    const customFooter = (html: string) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const spansToRemove = doc.querySelectorAll(
        '.icon-inline, .icon-file-o, .icon-file-pdf-o, .document-meta-data'
      );
      spansToRemove.forEach((span) => span.remove());

      return doc.body.innerHTML.toString();
    };

    setFooter(customFooter(fields.Footer.value)?.replace('/http', 'http'));
  }, [fields, pageEditing]);

  return (
    <div className="container">
      {fields ? (
        pageEditing ? (
          <RichText field={fields.Footer} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: Footer }} />
        )
      ) : (
        <span className="is-empty-hint">Rich text</span>
      )}
    </div>
  );
};
