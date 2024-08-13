/* eslint-disable react-hooks/rules-of-hooks */
import useIsMobile from 'lib/customHooks/isMobile';
import { ReactNode, useState } from 'react';
import { AccordionContext, useAccordionContext } from 'src/context/accordion';

type ChildrenReceiver = { children?: ReactNode };

export default function Accordion({ children }: ChildrenReceiver) {
  const [SelectedItem, setSelectedItem] = useState('');

  return (
    <AccordionContext.Provider value={{ SelectedItem, setSelectedItem }}>
      {children}
    </AccordionContext.Provider>
  );
}

type AccordionItem = {
  Name: string;
  UpdateDate?: string;
  Status?: string;
};

// eslint-disable-next-line react/display-name
Accordion.Item = ({ children, Name, Status, UpdateDate }: ChildrenReceiver & AccordionItem) => {
  const { SelectedItem, setSelectedItem } = useAccordionContext();
  const isMobile = useIsMobile(780);
  const isOpened = SelectedItem === Name;
  const textUpdateDate = new Date(UpdateDate ?? '').toLocaleDateString('en-US');

  const onClickItem = (Name: string) => {
    setSelectedItem(isOpened ? '' : Name);

    setTimeout(() => {
      const item = document.querySelector<HTMLDivElement>(".accordion-item[data-open='true']");

      item?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 300);
  };

  return (
    <div className="accordion-item" data-open={isOpened}>
      <button
        onClick={() => onClickItem(Name)}
        type="button"
        id={Name}
        aria-controls={`accordion-item-body-${Name}`}
        aria-expanded={isOpened}
        className="accordion-item__header"
      >
        {isMobile ? (
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-5 text-start">
              <span className="h5">{Name}</span>
              <div className="flex gap-2">
                {UpdateDate && <AccordionInfoBox isUpdateDate text={textUpdateDate} />}
                {Status && <AccordionInfoBox text={Status} />}
              </div>
            </div>
            <svg
              className="min-w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
            >
              <path
                d="M0.608545 1.371C0.960159 1.01949 1.43699 0.822021 1.93417 0.822021C2.43135 0.822021 2.90818 1.01949 3.25979 1.371L12.541 10.6522L21.8223 1.371C22.1759 1.02945 22.6496 0.84046 23.1412 0.844732C23.6328 0.849004 24.1031 1.0462 24.4507 1.39384C24.7983 1.74148 24.9955 2.21175 24.9998 2.70337C25.0041 3.19499 24.8151 3.66862 24.4735 4.02225L13.8667 14.6291C13.5151 14.9806 13.0382 15.1781 12.541 15.1781C12.0439 15.1781 11.567 14.9806 11.2154 14.6291L0.608545 4.02225C0.257037 3.67063 0.0595703 3.1938 0.0595703 2.69662C0.0595703 2.19944 0.257037 1.72261 0.608545 1.371Z"
                fill="white"
              />
              <path
                d="M0.608545 1.371C0.960159 1.01949 1.43699 0.822021 1.93417 0.822021C2.43135 0.822021 2.90818 1.01949 3.25979 1.371L12.541 10.6522L21.8223 1.371C22.1759 1.02945 22.6496 0.84046 23.1412 0.844732C23.6328 0.849004 24.1031 1.0462 24.4507 1.39384C24.7983 1.74148 24.9955 2.21175 24.9998 2.70337C25.0041 3.19499 24.8151 3.66862 24.4735 4.02225L13.8667 14.6291C13.5151 14.9806 13.0382 15.1781 12.541 15.1781C12.0439 15.1781 11.567 14.9806 11.2154 14.6291L0.608545 4.02225C0.257037 3.67063 0.0595703 3.1938 0.0595703 2.69662C0.0595703 2.19944 0.257037 1.72261 0.608545 1.371Z"
                fill="#253E7B"
              />
            </svg>
          </div>
        ) : (
          <>
            <div className="flex gap-5">
              <span className="h5 text-dark-blue">{Name}</span>
              {UpdateDate && <AccordionInfoBox isUpdateDate text={textUpdateDate} />}
            </div>
            <div className="flex gap-10 items-center">
              {Status && <AccordionInfoBox text={Status} />}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="16"
                viewBox="0 0 25 16"
                fill="none"
              >
                <path
                  d="M0.608545 1.371C0.960159 1.01949 1.43699 0.822021 1.93417 0.822021C2.43135 0.822021 2.90818 1.01949 3.25979 1.371L12.541 10.6522L21.8223 1.371C22.1759 1.02945 22.6496 0.84046 23.1412 0.844732C23.6328 0.849004 24.1031 1.0462 24.4507 1.39384C24.7983 1.74148 24.9955 2.21175 24.9998 2.70337C25.0041 3.19499 24.8151 3.66862 24.4735 4.02225L13.8667 14.6291C13.5151 14.9806 13.0382 15.1781 12.541 15.1781C12.0439 15.1781 11.567 14.9806 11.2154 14.6291L0.608545 4.02225C0.257037 3.67063 0.0595703 3.1938 0.0595703 2.69662C0.0595703 2.19944 0.257037 1.72261 0.608545 1.371Z"
                  fill="white"
                />
                <path
                  d="M0.608545 1.371C0.960159 1.01949 1.43699 0.822021 1.93417 0.822021C2.43135 0.822021 2.90818 1.01949 3.25979 1.371L12.541 10.6522L21.8223 1.371C22.1759 1.02945 22.6496 0.84046 23.1412 0.844732C23.6328 0.849004 24.1031 1.0462 24.4507 1.39384C24.7983 1.74148 24.9955 2.21175 24.9998 2.70337C25.0041 3.19499 24.8151 3.66862 24.4735 4.02225L13.8667 14.6291C13.5151 14.9806 13.0382 15.1781 12.541 15.1781C12.0439 15.1781 11.567 14.9806 11.2154 14.6291L0.608545 4.02225C0.257037 3.67063 0.0595703 3.1938 0.0595703 2.69662C0.0595703 2.19944 0.257037 1.72261 0.608545 1.371Z"
                  fill="#253E7B"
                />
              </svg>
            </div>
          </>
        )}
      </button>
      <div
        id={`accordion-item-body-${Name}`}
        role="region"
        aria-labelledby={Name}
        className="accordion-item__content"
      >
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
