/* eslint-disable react-hooks/rules-of-hooks */
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import AccordionArrow from 'assets/svg/AccordionArrow';
import useIsMobile from 'lib/customHooks/isMobile';
import { MouseEvent, ReactNode, useEffect } from 'react';

type ChildrenReceiver = { children?: ReactNode };

export default function Accordion({ children }: ChildrenReceiver) {
  return <div className="accordion">{children}</div>;
}

type AccordionItem = {
  Name: string;
  UpdateDate?: string;
  Status?: string;
  Id?: string;
};

// eslint-disable-next-line react/display-name
Accordion.Item = ({ children, Name, Status, UpdateDate, Id }: ChildrenReceiver & AccordionItem) => {
  const isMobile = useIsMobile(780);
  const {
    sitecoreContext: { pageEditing },
  } = useSitecoreContext();
  const textUpdateDate = new Date(UpdateDate ?? '').toLocaleDateString('en-US');
  const validDate = UpdateDate !== '0001-01-01T00:00:00Z';

  useEffect(() => {
    if (pageEditing) {
      const accordionItems = document.querySelectorAll('.accordion-item');
      accordionItems.forEach((item) => item.setAttribute('data-open', 'true'));
    }
  }, [pageEditing]);

  const onClickItem = (e: MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.closest<HTMLDivElement>('.accordion-item');
    if (!item) return;

    const btn = item.querySelector<HTMLButtonElement>('button');
    const isItemOpened = item.dataset.open === 'true';
    item.dataset.open = String(!isItemOpened);
    btn?.setAttribute('aria-expanded', String(!isItemOpened));

    if (isItemOpened) return;
    setTimeout(() => {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 300);
  };

  return (
    <div className="accordion-item">
      <button
        onClick={onClickItem}
        type="button"
        id={Id ? Id : undefined}
        aria-expanded={false}
        aria-label={Name}
        className="accordion-item__header"
      >
        {isMobile ? (
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-5 text-start">
              <span className="h5">{Name}</span>
              <div className="flex gap-2">
                {UpdateDate && validDate && <AccordionInfoBox isUpdateDate text={textUpdateDate} />}
                {Status && <AccordionInfoBox text={Status} />}
              </div>
            </div>
            <AccordionArrow className="arrow min-w-6 mt-2" />
          </div>
        ) : (
          <>
            <div className="flex gap-5">
              <span className="h5 text-dark-blue text-start">{Name}</span>
              {UpdateDate && validDate && <AccordionInfoBox isUpdateDate text={textUpdateDate} />}
            </div>
            <div className="flex gap-4 lg:gap-10 items-center">
              {Status && <AccordionInfoBox text={Status} />}
              <AccordionArrow className="arrow min-w-6" />
            </div>
          </>
        )}
      </button>
      <div role="region" className="accordion-item__content">
        <div className="py-10">{children}</div>
      </div>
    </div>
  );
};

type AccordionInfoBoxType = {
  isUpdateDate?: boolean;
  text: string;
};

function AccordionInfoBox({ text, isUpdateDate }: AccordionInfoBoxType) {
  return (
    <div className="accordion-item__info-box" data-status={!isUpdateDate}>
      {isUpdateDate && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 10C1 11.1819 1.23279 12.3522 1.68508 13.4442C2.13738 14.5361 2.80031 15.5282 3.63604 16.364C4.47177 17.1997 5.46392 17.8626 6.55585 18.3149C7.64778 18.7672 8.8181 19 10 19C11.1819 19 12.3522 18.7672 13.4442 18.3149C14.5361 17.8626 15.5282 17.1997 16.364 16.364C17.1997 15.5282 17.8626 14.5361 18.3149 13.4442C18.7672 12.3522 19 11.1819 19 10C19 7.61305 18.0518 5.32387 16.364 3.63604C14.6761 1.94821 12.3869 1 10 1C7.61305 1 5.32387 1.94821 3.63604 3.63604C1.94821 5.32387 1 7.61305 1 10Z"
            stroke="#1A65AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 5V10L13 13"
            stroke="#1A65AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <p className={`${isUpdateDate ? 'p3' : '!font-bold p2'} text-powder-blue`}>
        {isUpdateDate && 'Updated '}
        {text}
      </p>
    </div>
  );
}
