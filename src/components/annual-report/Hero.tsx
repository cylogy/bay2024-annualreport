import { Field, Link, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import Pause from 'assets/svg/Pause';
import useIsMobile from 'lib/customHooks/isMobile';
import { useEffect, useRef, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { HeroProps } from 'src/types/Hero';

interface YTEvent {
  target: YTPlayer;
}

export const Main = ({
  fields: { Description, Headline, Image, Video, AnchorID },
  layoutData,
}: HeroProps): JSX.Element => {
  const isMobile = useIsMobile(1024);
  const [Playing, setPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const playButton = document.querySelector('.lty-playbtn') as HTMLButtonElement;
      if (playButton) playButton.click();
    }, 100);

    const onPageLoad = () => {
      const loadYouTubeIframeAPI = () => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.defer = true;
        tag.async = true;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      };

      if (!window.YT) loadYouTubeIframeAPI();

      window.onYouTubeIframeAPIReady = () => {
        if (!iframeRef.current) return;
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event: YTEvent) => {
              event.target.playVideo();
            },
          },
        });
      };
    };

    if (document.readyState === 'complete') {
      onPageLoad();
      return;
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  const unFocusIframe = () => {
    const iframe = document.querySelector<HTMLIFrameElement>('.hero__video-player iframe');
    iframe?.setAttribute('tabindex', '-1');
  };

  const toggleVideo = () => {
    if (!playerRef.current) return;
    Playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
    setPlaying((v) => !v);
  };
  const breadcrumb = layoutData?.sitecore?.route?.fields?.Breadcrumb as Field<boolean>;
  console.log('Breadcrumb:' + breadcrumb?.value);
  return (
    <>
      <div className="hero relative" id={AnchorID.value}>
        <picture>
          <img className="hero__bg-image" src={Image.value?.src} alt="" />
          {/* placeholder="empty"
            fetchpriority="high"
            priority="true" */}
        </picture>
        {!isMobile && (
          <div className="hero__video-player">
            <LiteYouTubeEmbed
              id={Video.value}
              ref={iframeRef}
              title="Video"
              onIframeAdded={unFocusIframe}
              wrapperClass="size-full absolute top-0 left-0 block"
              params={`controls=0&rel=0&showinfo=0&playlist=${Video.value}&loop=1&enablejsapi=1`}
              poster="default"
              thumbnail=" "
              rel="0"
              muted
              webp
            />
          </div>
        )}
        <div className="hero__background" />
        <div className="hero__content text-center space-y-6 flex flex-col items-center">
          <Text tag="h1" field={Headline} />
          <Text field={Description} className="hidden lg:block" tag="p" />
        </div>
        {!isMobile && (
          <button onClick={toggleVideo} className="p3 flex items-center gap-2.5">
            <Pause /> {Playing ? 'Pause' : 'Play'} video
          </button>
        )}
        <Curve />
      </div>
      <Text
        field={Description}
        className="block lg:hidden font-medium container text-center py-10 pb-0 text-dark-blue"
        tag="p"
      />
    </>
  );
};

export const Secondary = ({
  fields: { Image, Headline, Description, AnchorID },
  layoutData,
}: HeroProps): JSX.Element => {
  const breadcrumb = layoutData?.sitecore?.route?.fields?.Breadcrumb as Field<boolean>;
  console.log('Breadcrumb:' + breadcrumb.value);

  return (
    <div className="hero relative hero--secondary" id={AnchorID.value}>
      <picture>
        <img className="hero__bg-image" src={Image.value?.src} alt="" />
        {/* <JssImage
          className="hero__bg-image"
          field={Image}
          placeholder="empty"
          fetchpriority="high"
          priority="true"
        /> */}
      </picture>
      <div className="hero__background" />
      <div className="hero__content text-center space-y-6 flex flex-col items-center container">
        <Text tag="h1" field={Headline} />
        <Text field={Description} tag="p" />
      </div>
      <Curve />
    </div>
  );
};

export const Download = ({
  fields: { Image, CTA, Description, Headline, AnchorID },
  layoutData,
}: HeroProps): JSX.Element => {
  const breadcrumb = layoutData?.sitecore?.route?.fields?.Breadcrumb as Field<boolean>;
  console.log('Breadcrumb:' + breadcrumb.value);
  return (
    <div className="px-[30px] xl:px-[7.5rem]" id={AnchorID.value}>
      <div className="hero relative hero--download">
        {/* <JssImage
          field={Image}
          className="hero--download__image"
          placeholder="blur"
          fetchpriority="low"
          loading="lazy"
        /> */}
        <img className="hero__bg-image" src={Image.value?.src} alt="" />
        <div className="hero__content text-center space-y-3 lg:space-y-6 flex flex-col items-center h-fit">
          <Text tag="h3" field={Headline} />
          <Text field={Description} tag="p" />
          <Link field={CTA} className="btn" />
        </div>
      </div>
    </div>
  );
};
