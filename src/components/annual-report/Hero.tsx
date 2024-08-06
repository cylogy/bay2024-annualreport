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

const playerOpts: YouTubeProps['opts'] & MutePlayer = {
  playerVars: {
    autoplay: 1,
    mute: 1,
    controls: 0,
    rel: 0,
  },
};

export const Default = ({ fields }: HeroProps): JSX.Element => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [Playing, setPlaying] = useState(true);
  const isMobile = useIsMobile(1024);

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
      <div
        className="hero relative"
        style={{
          backgroundImage: `url('${fields.Image.value?.src}')`,
        }}
      >
        {!isMobile && (
          <div className="hero__video-player">
            <YouTube
              className="w-full h-full absolute top-0 left-0 block"
              videoId={fields.Video.value}
              onReady={onReady}
              opts={playerOpts}
            />
          </div>
        )}
        <div className="hero__background" />
        <div className="hero__content text-center space-y-6 flex flex-col items-center">
          <Text tag="h1" field={fields.Headline} />
          <Text field={fields.Description} className="hidden lg:block" tag="p" />
        </div>
        {!isMobile && (
          <button onClick={toggleVideo} className="p3 flex items-center gap-2.5">
            <Pause /> {Playing ? 'Pause' : 'Play'} video
          </button>
        )}
        <Curve />
      </div>
      <Text
        field={fields.Description}
        className="block lg:hidden font-medium container text-center py-10 pb-0 text-dark-blue"
        tag="p"
      />
    </>
  );
};

export const Secondary = ({ fields }: HeroProps): JSX.Element => {
  return (
    <div
      className="hero relative hero--secondary"
      style={{
        backgroundImage: `url('${fields.Image.value?.src}')`,
      }}
    >
      <div className="hero__background" />
      <div className="hero__content text-center space-y-6 flex flex-col items-center container">
        <Text tag="h1" field={fields.Headline} />
        <Text field={fields.Description} tag="p" />
      </div>
      <Curve />
    </div>
  );
};

export const Download = ({ fields }: HeroProps): JSX.Element => {
  return (
    <div className="mx-[30px] lg:mx-auto container">
      <div className="hero relative hero--download">
        <JssImage field={fields.Image} className="hero--download__image" />
        <div className="hero__content text-center space-y-3 lg:space-y-6 flex flex-col items-center h-fit">
          <Text tag="h3" field={fields.Headline} />
          <Text field={fields.Description} tag="p" />
          <Link field={fields.CTA} className="btn" />
        </div>
      </div>
    </div>
  );
};
