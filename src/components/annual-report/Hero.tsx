import { Image as JssImage, Link, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import Pause from 'assets/svg/Pause';
import useIsMobile from 'lib/customHooks/isMobile';
import { useRef, useState } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { HeroProps } from 'src/types/Hero';

type MutePlayer = {
  playerVars: {
    mute: number;
  };
};

export const Default = ({
  fields: { Description, Headline, Image, Video },
}: HeroProps): JSX.Element => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [Playing, setPlaying] = useState(true);
  const isMobile = useIsMobile(1024);

  const playerOpts: YouTubeProps['opts'] & MutePlayer = {
    playerVars: {
      rel: 0,
      autoplay: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      playlist: Video.value,
      loop: 1,
    },
  };

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
  };

  const toggleVideo = () => {
    if (!playerRef.current) return;
    Playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
    setPlaying((v) => !v);
  };

  return (
    <>
      <div className="hero relative">
        <picture>
          <JssImage className="hero__bg-image" field={Image} placeholder="blur" />
        </picture>
        {!isMobile && (
          <div className="hero__video-player">
            <YouTube
              className="w-full h-full absolute top-0 left-0 block"
              videoId={Video.value}
              onReady={onReady}
              opts={playerOpts}
              loading="lazy"
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

export const Secondary = ({ fields: { Image, Headline, Description } }: HeroProps): JSX.Element => {
  return (
    <div className="hero relative hero--secondary">
      <picture>
        <JssImage className="hero__bg-image" field={Image} placeholder="blur" />
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
  fields: { Image, CTA, Description, Headline },
}: HeroProps): JSX.Element => {
  return (
    <div className="mx-[30px] lg:mx-auto container">
      <div className="hero relative hero--download">
        <JssImage field={Image} className="hero--download__image" />
        <div className="hero__content text-center space-y-3 lg:space-y-6 flex flex-col items-center h-fit">
          <Text tag="h3" field={Headline} />
          <Text field={Description} tag="p" />
          <Link field={CTA} className="btn" />
        </div>
      </div>
    </div>
  );
};
