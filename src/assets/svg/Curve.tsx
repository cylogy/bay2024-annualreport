import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

type CurveProps = {
  isForm?: boolean;
  isWhite?: boolean;
};

export default function Curve({ isForm, isWhite }: CurveProps) {
  const {
    sitecoreContext: { pageEditing },
  } = useSitecoreContext();

  if (pageEditing) return <></>;

  if (isForm)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 72" fill="none" className="w-full">
        <path
          d="M0 -72C0 -72 584.862 -38 960 -38C1335.14 -38 1920 -72 1920 -72V26C1920 26 1334.98 72 960 72C585.015 72 0 26 0 26V-72Z"
          fill={isWhite ? 'white' : '#f5f5f5'}
        ></path>
      </svg>
    );

  return (
    <svg viewBox="0 0 500 150" className="block w-full h-auto absolute">
      <defs>
        <clipPath
          id="clipPath"
          clipPathUnits="objectBoundingBox"
          transform="scale(0.002 0.0066666666666)"
        >
          <path
            className="block lg:hidden"
            d="M0,0 449.193832,0 500,0 L500,144 C402.289931,148.990234 323.95855,150 265.005859,150 C206.053168,150 117.717882,148.990234 0,144.970703 L0,4.36488598 Z"
          />
          <path
            className="hidden lg:block"
            d="M0,0 449.193832,0 500,0
              L500,130.970703 C402.289931,146.990234 323.95855,150 265.005859,150 C206.053168,150 117.717882,146.990234
              0,130.970703 L0,4.36488598 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
