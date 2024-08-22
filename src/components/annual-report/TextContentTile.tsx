import {
  Field,
  Text,
  LayoutServiceData,
  RichTextField,
  RichText,
  withDatasourceCheck,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import BlueSquareBullet from './atoms/BlueSquareBullet';
type ContentTileItemProps = ComponentProps & {
  layoutData: LayoutServiceData;
  fields: {
    Headline: Field<string>;
    Description: RichTextField;
    Number: Field<string>;
    AnchorID: Field<string>;
  };
};
export const Default = withDatasourceCheck()<ContentTileItemProps>(
  (props: ContentTileItemProps): JSX.Element => {
    return props.params.variant === 'ThreeColumns' ? (
      <article className="text-white bg-dark-powder-blue p-[40px] rounded-[20px] relative tct">
        <Image
          className="object-cover w-full absolute top-0 left-0 decoration"
          field={{ src: '/images/textContentTiles-bg.png', alt: '' }}
        />
        <Text tag="p" className="mb-[10px] h4" field={props.fields.Headline} />
        <RichText className="p2" field={props.fields.Description} />
      </article>
    ) : props.params.variant === 'Stacked' ? (
      <article className="text-dark-blue tct" id={props.fields.Number.value}>
        <Text tag="p" className="mb-[12px] year h4" field={props.fields.Number} />
        <Text tag="p" className="mb-[12px] h3" field={props.fields.Headline} />
        <RichText className="p1" field={props.fields.Description} />
      </article>
    ) : props.params.variant === 'Cards' ? (
      <article className="text-dark-blue bg-white p-[40px] rounded-[20px] relative">
        <Text
          tag="h4"
          className="mb-[10px] pb-[20px] border-b-[2px] border-solid border-light-green mb-[30px]"
          field={props.fields.Headline}
        />
        <RichText className="p1" field={props.fields.Description} />
        {/*HTML FOR THE CONTACT SECTION
        <div className="py-[25px]">
          <p className="p2 p-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.66669 0.833313C7.12692 0.833313 7.50002 1.20641 7.50002 1.66665V2.49998H12.5V1.66665C12.5 1.20641 12.8731 0.833313 13.3334 0.833313C13.7936 0.833313 14.1667 1.20641 14.1667 1.66665V2.49998H15.8334C17.2141 2.49998 18.3334 3.61927 18.3334 4.99998V16.6666C18.3334 18.0474 17.2141 19.1666 15.8334 19.1666H4.16669C2.78598 19.1666 1.66669 18.0474 1.66669 16.6666V4.99998C1.66669 3.61927 2.78598 2.49998 4.16669 2.49998H5.83335V1.66665C5.83335 1.20641 6.20645 0.833313 6.66669 0.833313ZM5.83335 4.16665H4.16669C3.70645 4.16665 3.33335 4.53974 3.33335 4.99998V7.49998H16.6667V4.99998C16.6667 4.53974 16.2936 4.16665 15.8334 4.16665H14.1667V4.99998C14.1667 5.46022 13.7936 5.83331 13.3334 5.83331C12.8731 5.83331 12.5 5.46022 12.5 4.99998V4.16665H7.50002V4.99998C7.50002 5.46022 7.12692 5.83331 6.66669 5.83331C6.20645 5.83331 5.83335 5.46022 5.83335 4.99998V4.16665ZM16.6667 9.16665H3.33335V16.6666C3.33335 17.1269 3.70645 17.5 4.16669 17.5H15.8334C16.2936 17.5 16.6667 17.1269 16.6667 16.6666V9.16665Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.66669 0.833313C7.12692 0.833313 7.50002 1.20641 7.50002 1.66665V2.49998H12.5V1.66665C12.5 1.20641 12.8731 0.833313 13.3334 0.833313C13.7936 0.833313 14.1667 1.20641 14.1667 1.66665V2.49998H15.8334C17.2141 2.49998 18.3334 3.61927 18.3334 4.99998V16.6666C18.3334 18.0474 17.2141 19.1666 15.8334 19.1666H4.16669C2.78598 19.1666 1.66669 18.0474 1.66669 16.6666V4.99998C1.66669 3.61927 2.78598 2.49998 4.16669 2.49998H5.83335V1.66665C5.83335 1.20641 6.20645 0.833313 6.66669 0.833313ZM5.83335 4.16665H4.16669C3.70645 4.16665 3.33335 4.53974 3.33335 4.99998V7.49998H16.6667V4.99998C16.6667 4.53974 16.2936 4.16665 15.8334 4.16665H14.1667V4.99998C14.1667 5.46022 13.7936 5.83331 13.3334 5.83331C12.8731 5.83331 12.5 5.46022 12.5 4.99998V4.16665H7.50002V4.99998C7.50002 5.46022 7.12692 5.83331 6.66669 5.83331C6.20645 5.83331 5.83335 5.46022 5.83335 4.99998V4.16665ZM16.6667 9.16665H3.33335V16.6666C3.33335 17.1269 3.70645 17.5 4.16669 17.5H15.8334C16.2936 17.5 16.6667 17.1269 16.6667 16.6666V9.16665Z"
                fill="#253E7B"
              ></path>
            </svg>
            Mon-Fri | 8:30am-5:00pm <br />
            415.749.5000
          </p>
        </div>
        <div className="py-[25px]">
          <p className="p2 p-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.66669 0.833313C7.12692 0.833313 7.50002 1.20641 7.50002 1.66665V2.49998H12.5V1.66665C12.5 1.20641 12.8731 0.833313 13.3334 0.833313C13.7936 0.833313 14.1667 1.20641 14.1667 1.66665V2.49998H15.8334C17.2141 2.49998 18.3334 3.61927 18.3334 4.99998V16.6666C18.3334 18.0474 17.2141 19.1666 15.8334 19.1666H4.16669C2.78598 19.1666 1.66669 18.0474 1.66669 16.6666V4.99998C1.66669 3.61927 2.78598 2.49998 4.16669 2.49998H5.83335V1.66665C5.83335 1.20641 6.20645 0.833313 6.66669 0.833313ZM5.83335 4.16665H4.16669C3.70645 4.16665 3.33335 4.53974 3.33335 4.99998V7.49998H16.6667V4.99998C16.6667 4.53974 16.2936 4.16665 15.8334 4.16665H14.1667V4.99998C14.1667 5.46022 13.7936 5.83331 13.3334 5.83331C12.8731 5.83331 12.5 5.46022 12.5 4.99998V4.16665H7.50002V4.99998C7.50002 5.46022 7.12692 5.83331 6.66669 5.83331C6.20645 5.83331 5.83335 5.46022 5.83335 4.99998V4.16665ZM16.6667 9.16665H3.33335V16.6666C3.33335 17.1269 3.70645 17.5 4.16669 17.5H15.8334C16.2936 17.5 16.6667 17.1269 16.6667 16.6666V9.16665Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.66669 0.833313C7.12692 0.833313 7.50002 1.20641 7.50002 1.66665V2.49998H12.5V1.66665C12.5 1.20641 12.8731 0.833313 13.3334 0.833313C13.7936 0.833313 14.1667 1.20641 14.1667 1.66665V2.49998H15.8334C17.2141 2.49998 18.3334 3.61927 18.3334 4.99998V16.6666C18.3334 18.0474 17.2141 19.1666 15.8334 19.1666H4.16669C2.78598 19.1666 1.66669 18.0474 1.66669 16.6666V4.99998C1.66669 3.61927 2.78598 2.49998 4.16669 2.49998H5.83335V1.66665C5.83335 1.20641 6.20645 0.833313 6.66669 0.833313ZM5.83335 4.16665H4.16669C3.70645 4.16665 3.33335 4.53974 3.33335 4.99998V7.49998H16.6667V4.99998C16.6667 4.53974 16.2936 4.16665 15.8334 4.16665H14.1667V4.99998C14.1667 5.46022 13.7936 5.83331 13.3334 5.83331C12.8731 5.83331 12.5 5.46022 12.5 4.99998V4.16665H7.50002V4.99998C7.50002 5.46022 7.12692 5.83331 6.66669 5.83331C6.20645 5.83331 5.83335 5.46022 5.83335 4.99998V4.16665ZM16.6667 9.16665H3.33335V16.6666C3.33335 17.1269 3.70645 17.5 4.16669 17.5H15.8334C16.2936 17.5 16.6667 17.1269 16.6667 16.6666V9.16665Z"
                fill="#253E7B"
              ></path>
            </svg>
            <span>
              <strong>
                Bay Area Air Quality
                <br /> Management District
              </strong>
              <br />
              375 Beale Street, Suite 600
              <br /> San Francisco, CA 94105
            </span>
          </p>
        </div>
        <div className="py-[25px]">
          <a href="/" className="p2 p-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8201 20.768L3.75306 3.968C3.68419 3.87931 3.64159 3.77307 3.6301 3.66137C3.61861 3.54967 3.63871 3.43698 3.68809 3.33613C3.73747 3.23528 3.81416 3.15032 3.90944 3.09089C4.00472 3.03147 4.11477 2.99998 4.22706 3H6.70706C6.79836 3.00014 6.88842 3.0211 6.97038 3.06131C7.05235 3.10151 7.12406 3.15989 7.18006 3.232L20.2471 20.032C20.3159 20.1207 20.3585 20.2269 20.37 20.3386C20.3815 20.4503 20.3614 20.563 20.312 20.6639C20.2626 20.7647 20.186 20.8497 20.0907 20.9091C19.9954 20.9685 19.8854 21 19.7731 21H17.2931C17.2018 20.9999 17.1117 20.9789 17.0297 20.9387C16.9478 20.8985 16.8761 20.8401 16.8201 20.768Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M16.8201 20.768L3.75306 3.968C3.68419 3.87931 3.64159 3.77307 3.6301 3.66137C3.61861 3.54967 3.63871 3.43698 3.68809 3.33613C3.73747 3.23528 3.81416 3.15032 3.90944 3.09089C4.00472 3.03147 4.11477 2.99998 4.22706 3H6.70706C6.79836 3.00014 6.88842 3.0211 6.97038 3.06131C7.05235 3.10151 7.12406 3.15989 7.18006 3.232L20.2471 20.032C20.3159 20.1207 20.3585 20.2269 20.37 20.3386C20.3815 20.4503 20.3614 20.563 20.312 20.6639C20.2626 20.7647 20.186 20.8497 20.0907 20.9091C19.9954 20.9685 19.8854 21 19.7731 21H17.2931C17.2018 20.9999 17.1117 20.9789 17.0297 20.9387C16.9478 20.8985 16.8761 20.8401 16.8201 20.768Z"
                stroke="#253E7B"
                stroke-width="1.5"
              />
              <path d="M20 3L4 21" stroke="white" stroke-width="1.5" stroke-linecap="round" />
              <path d="M20 3L4 21" stroke="#253E7B" stroke-width="1.5" stroke-linecap="round" />
            </svg>

            <span>X/Twitter</span>
          </a>
          <a href="/" className="p2 p-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.997 8.33177C9.97722 8.33177 8.32888 9.98013 8.32888 12C8.32888 14.0199 9.97722 15.6682 11.997 15.6682C14.0169 15.6682 15.6652 14.0199 15.6652 12C15.6652 9.98013 14.0169 8.33177 11.997 8.33177ZM22.9988 12C22.9988 10.481 23.0125 8.97571 22.9272 7.45943C22.8419 5.69824 22.4402 4.13519 21.1523 2.84732C19.8617 1.55669 18.3014 1.15767 16.5403 1.07237C15.0213 0.987059 13.516 1.00082 11.9998 1.00082C10.4808 1.00082 8.97556 0.987059 7.45931 1.07237C5.69815 1.15767 4.13513 1.55945 2.84728 2.84732C1.55668 4.13794 1.15767 5.69824 1.07237 7.45943C0.987059 8.97846 1.00082 10.4837 1.00082 12C1.00082 13.5163 0.987059 15.0243 1.07237 16.5406C1.15767 18.3018 1.55944 19.8648 2.84728 21.1527C4.13788 22.4433 5.69815 22.8423 7.45931 22.9276C8.97831 23.0129 10.4835 22.9992 11.9998 22.9992C13.5188 22.9992 15.024 23.0129 16.5403 22.9276C18.3014 22.8423 19.8645 22.4406 21.1523 21.1527C22.4429 19.8621 22.8419 18.3018 22.9272 16.5406C23.0153 15.0243 22.9988 13.519 22.9988 12ZM11.997 17.6441C8.87374 17.6441 6.35309 15.1234 6.35309 12C6.35309 8.87664 8.87374 6.35594 11.997 6.35594C15.1203 6.35594 17.641 8.87664 17.641 12C17.641 15.1234 15.1203 17.6441 11.997 17.6441ZM17.8722 7.44292C17.1429 7.44292 16.554 6.85402 16.554 6.12478C16.554 5.39554 17.1429 4.80664 17.8722 4.80664C18.6014 4.80664 19.1903 5.39554 19.1903 6.12478C19.1905 6.29794 19.1565 6.46945 19.0904 6.62947C19.0242 6.78949 18.9271 6.93489 18.8047 7.05733C18.6822 7.17978 18.5369 7.27686 18.3768 7.34303C18.2168 7.40919 18.0453 7.44314 17.8722 7.44292Z"
                fill="white"
              />
              <path
                d="M11.997 8.33177C9.97722 8.33177 8.32888 9.98013 8.32888 12C8.32888 14.0199 9.97722 15.6682 11.997 15.6682C14.0169 15.6682 15.6652 14.0199 15.6652 12C15.6652 9.98013 14.0169 8.33177 11.997 8.33177ZM22.9988 12C22.9988 10.481 23.0125 8.97571 22.9272 7.45943C22.8419 5.69824 22.4402 4.13519 21.1523 2.84732C19.8617 1.55669 18.3014 1.15767 16.5403 1.07237C15.0213 0.987059 13.516 1.00082 11.9998 1.00082C10.4808 1.00082 8.97556 0.987059 7.45931 1.07237C5.69815 1.15767 4.13513 1.55945 2.84728 2.84732C1.55668 4.13794 1.15767 5.69824 1.07237 7.45943C0.987059 8.97846 1.00082 10.4837 1.00082 12C1.00082 13.5163 0.987059 15.0243 1.07237 16.5406C1.15767 18.3018 1.55944 19.8648 2.84728 21.1527C4.13788 22.4433 5.69815 22.8423 7.45931 22.9276C8.97831 23.0129 10.4835 22.9992 11.9998 22.9992C13.5188 22.9992 15.024 23.0129 16.5403 22.9276C18.3014 22.8423 19.8645 22.4406 21.1523 21.1527C22.4429 19.8621 22.8419 18.3018 22.9272 16.5406C23.0153 15.0243 22.9988 13.519 22.9988 12ZM11.997 17.6441C8.87374 17.6441 6.35309 15.1234 6.35309 12C6.35309 8.87664 8.87374 6.35594 11.997 6.35594C15.1203 6.35594 17.641 8.87664 17.641 12C17.641 15.1234 15.1203 17.6441 11.997 17.6441ZM17.8722 7.44292C17.1429 7.44292 16.554 6.85402 16.554 6.12478C16.554 5.39554 17.1429 4.80664 17.8722 4.80664C18.6014 4.80664 19.1903 5.39554 19.1903 6.12478C19.1905 6.29794 19.1565 6.46945 19.0904 6.62947C19.0242 6.78949 18.9271 6.93489 18.8047 7.05733C18.6822 7.17978 18.5369 7.27686 18.3768 7.34303C18.2168 7.40919 18.0453 7.44314 17.8722 7.44292Z"
                fill="#253E7B"
              />
            </svg>
            <span>Instagram</span>
          </a>
          <a href="/" className="p2 p-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
                fill="white"
              />
              <path
                d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
                fill="#253E7B"
              />
            </svg>
            <span>Facebook</span>
          </a>
          <a href="/" className="p2 p-icon">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 15.5L15.19 12.5L10 9.5V15.5ZM21.56 7.67C21.69 8.14 21.78 8.77 21.84 9.57C21.91 10.37 21.94 11.06 21.94 11.66L22 12.5C22 14.69 21.84 16.3 21.56 17.33C21.31 18.23 20.73 18.81 19.83 19.06C19.36 19.19 18.5 19.28 17.18 19.34C15.88 19.41 14.69 19.44 13.59 19.44L12 19.5C7.81 19.5 5.2 19.34 4.17 19.06C3.27 18.81 2.69 18.23 2.44 17.33C2.31 16.86 2.22 16.23 2.16 15.43C2.09 14.63 2.06 13.94 2.06 13.34L2 12.5C2 10.31 2.16 8.7 2.44 7.67C2.69 6.77 3.27 6.19 4.17 5.94C4.64 5.81 5.5 5.72 6.82 5.66C8.12 5.59 9.31 5.56 10.41 5.56L12 5.5C16.19 5.5 18.8 5.66 19.83 5.94C20.73 6.19 21.31 6.77 21.56 7.67Z"
                fill="white"
              />
              <path
                d="M10 15.5L15.19 12.5L10 9.5V15.5ZM21.56 7.67C21.69 8.14 21.78 8.77 21.84 9.57C21.91 10.37 21.94 11.06 21.94 11.66L22 12.5C22 14.69 21.84 16.3 21.56 17.33C21.31 18.23 20.73 18.81 19.83 19.06C19.36 19.19 18.5 19.28 17.18 19.34C15.88 19.41 14.69 19.44 13.59 19.44L12 19.5C7.81 19.5 5.2 19.34 4.17 19.06C3.27 18.81 2.69 18.23 2.44 17.33C2.31 16.86 2.22 16.23 2.16 15.43C2.09 14.63 2.06 13.94 2.06 13.34L2 12.5C2 10.31 2.16 8.7 2.44 7.67C2.69 6.77 3.27 6.19 4.17 5.94C4.64 5.81 5.5 5.72 6.82 5.66C8.12 5.59 9.31 5.56 10.41 5.56L12 5.5C16.19 5.5 18.8 5.66 19.83 5.94C20.73 6.19 21.31 6.77 21.56 7.67Z"
                fill="#253E7B"
              />
            </svg>

            <span>
              <strong>Youtube</strong>
            </span>
          </a>
        </div>
        HTML FOR THE CONTACT SECTION*/}
      </article>
    ) : (
      <article className="text-dark-blue bg-white p-[40px] rounded-[40px] relative tct">
        <div className="mb-[24px] flex flex-col md:flex-row items-start md:items-center gap-[24px]">
          <BlueSquareBullet text={props.fields.Number.value} />
          <Text tag="h3" field={props.fields.Headline} />
        </div>
        <RichText className="p1 tct-rich-text" field={props.fields.Description} />
      </article>
    );
  }
);
