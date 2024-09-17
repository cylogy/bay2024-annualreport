import { Field, Link, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import Pause from 'assets/svg/Pause';
import Play from 'assets/svg/Play';
import { useRef, useState } from 'react';
import { HeroProps } from 'src/types/Hero';
import Breadcrumbs from './atoms/Breadcrumbs';
import NextImage from './atoms/NextImage';
import useIsMobile from 'lib/customHooks/isMobile';
import DownloadIcon from 'assets/svg/Download';

export const Main = ({ fields }: HeroProps): JSX.Element => {
  const isMobile = useIsMobile(1023, true);
  const [Playing, setPlaying] = useState(true);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const {
    sitecoreContext: { pageEditing },
  } = useSitecoreContext();

  const toggleVideo = () => {
    if (!playerRef.current) return;
    Playing ? playerRef.current?.pause() : playerRef.current?.play();
    setPlaying((v) => !v);
  };

  const handleEnded = () => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = 11;
    playerRef.current.play();
  };

  if (!fields) return <></>;
  const { Description, Headline, Image, AnchorID, Video } = fields;
  return (
    <>
      <div className="hero" id={AnchorID.value}>
        <NextImage
          className="hero__bg-image"
          field={Image}
          fetchPriority="high"
          sizes="(min-width: 768px) 100vw, 70vw"
          priority
        />
        <div className="hero__video-player w-full">
          {!pageEditing && !isMobile && (
            <video
              className="size-full absolute top-0 left-0 block"
              playsInline
              autoPlay
              muted
              onEnded={handleEnded}
              ref={playerRef}
            >
              {/* <source type="video/mp4" src={Video.value?.href} /> */}
              <source type="video/mp4" src="/images/StrategicPlanHero.mp4" />
            </video>
          )}
        </div>
        {!pageEditing && <div className="hero__background" />}
        <div className="hero__content space-y-6 flex flex-col items-center">
          <Text tag="h1" field={Headline} />
          <Text field={Description} className="hidden lg:block" tag="p" />
        </div>
        {!pageEditing && (
          <button onClick={toggleVideo} className="p3">
            {Playing ? (
              <>
                <Pause />
                Pause
              </>
            ) : (
              <>
                <Play />
                Play
              </>
            )}{' '}
            video
          </button>
        )}
        <div className="block relative w-full h-[150px]">
          <Curve />
        </div>
      </div>
      <Text
        field={Description}
        className="block lg:hidden font-medium container text-center py-10 pb-0 text-dark-blue"
        tag="p"
      />
    </>
  );
};

export const Secondary = (props: HeroProps): JSX.Element => {
  if (props.fields) {
    const {
      fields: { Image, Headline, Description, AnchorID },
      layoutData,
    } = props;
    const breadcrumb = layoutData?.sitecore?.route?.fields?.Breadcrumb as Field<boolean>;

    return (
      <div className="bg-soft-white">
        <div className="hero hero--secondary" id={AnchorID.value}>
          <NextImage
            className="hero__bg-image"
            field={Image}
            fetchPriority="high"
            sizes="(min-width: 768px) 100vw, 70vw"
            priority
          />
          <div className="hero__background" />
          <div className="hero__content space-y-6 flex flex-col items-center container">
            <Text tag="h1" field={Headline} />
            <Text field={Description} tag="p" />
          </div>
          <div className="block relative w-full h-[150px]">
            <Curve />
          </div>
        </div>
        {breadcrumb?.value && <Breadcrumbs />}
      </div>
    );
  }
  return <></>;
};

export const Download = (props: HeroProps): JSX.Element => {
  if (props.fields) {
    const {
      fields: { Image, CTA, Description, Headline, AnchorID },
    } = props;
    return (
      <div className="container" id={AnchorID.value}>
        <div className="hero hero--download">
          <NextImage
            field={Image}
            className="hero--download__image"
            fetchPriority="low"
            loading="lazy"
          />
          <div className="hero__content space-y-3 lg:space-y-6 flex flex-col items-center h-fit">
            <Text tag="h3" field={Headline} />
            <Text field={Description} tag="p" />
            <Link field={CTA} className="btn">
              <DownloadIcon className="fill-dark-blue mr-2 flex-shrink-0" />
              {CTA.value.text}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
