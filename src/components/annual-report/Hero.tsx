import { Field, Link, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import Pause from 'assets/svg/Pause';
import useIsMobile from 'lib/customHooks/isMobile';
import { useEffect, useRef, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { HeroProps } from 'src/types/Hero';
import Breadcrumbs from './atoms/Breadcrumbs';
import NextImage from './atoms/NextImage';
import Play from 'assets/svg/Play';

interface YTEvent {
  target: YTPlayer;
}

export const Main = (props: HeroProps): JSX.Element => {
  const isMobile = useIsMobile(1350);
  const [Playing, setPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const {
    sitecoreContext: { pageEditing },
  } = useSitecoreContext();

  useEffect(() => {
    const playButton = document.querySelector<HTMLButtonElement>('.lty-playbtn');
    !isMobile && !pageEditing && playButton?.click();

    const onPageLoad = () => {
      if (isMobile) return;
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
  }, [isMobile, pageEditing]);

  const onIframeAdded = () => {
    const iframe = document.querySelector<HTMLIFrameElement>('.hero__video-player iframe');
    iframe?.setAttribute('tabindex', '-1');
    const wrapper = document.querySelector<HTMLDivElement>('.hero__video-wrapper');
    setTimeout(() => wrapper?.classList.remove('hidden'), 1000);
  };

  const toggleVideo = () => {
    if (!playerRef.current) return;
    Playing ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo();
    setPlaying((v) => !v);
  };

  if (props.fields) {
    const {
      fields: { Description, Headline, Image, Video, AnchorID },
    } = props;
    return (
      <>
        <div className="hero" id={AnchorID.value}>
          <NextImage className="hero__bg-image" field={Image} fetchPriority="high" priority />
          {!isMobile && !pageEditing && (
            <div className="hero__video-player">
              <LiteYouTubeEmbed
                id={Video.value}
                ref={iframeRef}
                title="Video"
                onIframeAdded={onIframeAdded}
                wrapperClass="hero__video-wrapper size-full absolute top-0 left-0 block hidden"
                params={`controls=0&rel=0&showinfo=0&playlist=${Video.value}&loop=1&enablejsapi=1`}
                poster="default"
                thumbnail=" "
                rel="0"
                muted
                webp
              />
            </div>
          )}
          {!pageEditing && <div className="hero__background" />}
          <div className="hero__content space-y-6 flex flex-col items-center">
            <Text tag="h1" field={Headline} />
            <Text field={Description} className="hidden lg:block" tag="p" />
          </div>
          {!isMobile && !pageEditing && (
            <button onClick={toggleVideo} className="p3 flex items-center gap-2.5">
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
          <Curve />
        </div>
        <Text
          field={Description}
          className="block lg:hidden font-medium container text-center py-10 pb-0 text-dark-blue"
          tag="p"
        />
      </>
    );
  }
  return <></>;
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
          <NextImage className="hero__bg-image" field={Image} fetchPriority="high" priority />
          <div className="hero__background" />
          <div className="hero__content space-y-6 flex flex-col items-center container">
            <Text tag="h1" field={Headline} />
            <Text field={Description} tag="p" />
          </div>
          <Curve />
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
            <Link field={CTA} className="btn" />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
