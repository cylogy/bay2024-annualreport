import Image from 'next/image';
interface HeroProps {
  title: string;
  message: string;
}

export default function Hero({ title, message }: HeroProps) {
  return (
    <div className="hero hero--secondary">
      <Image
        alt="A green hill with a city in the background"
        fetchPriority="high"
        width="1920"
        height="497"
        className="hero__bg-image"
        sizes="(min-width: 768px) 100vw, 70vw"
        src="/images/hero.jpg"
      />
      <div className="hero__background"></div>
      <div className="hero__content space-y-6 flex flex-col items-center container">
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
      <div className="block relative w-full h-[150px]">
        <svg viewBox="0 0 500 150">
          <defs>
            <clipPath
              id="clipPath"
              clipPathUnits="objectBoundingBox"
              transform="scale(0.002 0.0066666666666)"
            >
              <path
                className="block lg:hidden"
                d="M0,0 449.193832,0 500,0 L500,144 C402.289931,148.990234 323.95855,150 265.005859,150 C206.053168,150 117.717882,148.990234 0,144.970703 L0,4.36488598 Z"
              ></path>
              <path
                className="hidden lg:block"
                d="M0,0 449.193832,0 500,0   L500,130.970703 C402.289931,146.990234 323.95855,150 265.005859,150 C206.053168,150 117.717882,146.990234   0,130.970703 L0,4.36488598 Z"
              ></path>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
