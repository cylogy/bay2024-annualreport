import React, { useRef, useState } from 'react';
import {
  Field,
  Text,
  Image as JssImage,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import Pause from 'assets/svg/Pause';
import useIsMobile from 'lib/customHooks/isMobile';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

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

interface Fields {
  Headline: Field<string>;
  Description: Field<string>;
  Video: Field<string>;
  Image: ImageField;
  Cta: LinkField;
}

export type HeroProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

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

  console.log(props?.fields);
  return (
    <>
      <div
        className="hero relative"
        style={{
          backgroundImage: `url('${props.fields.Image.value?.src}')`,
        }}
      >
        {!isMobile && (
          <div className="hero__video-player">
            <YouTube
              className="w-full h-full absolute top-0 left-0 block"
              videoId={props.fields.Video.value}
              onReady={onReady}
              opts={playerOpts}
            />
          </div>
        )}
        <div className="hero__background" />
        <div className="hero__content text-center space-y-6 flex flex-col items-center">
          <Text tag="h1" field={props.fields.Headline} />
          <Text field={props.fields.Description} className="hidden lg:block" tag="p" />
        </div>
        {!isMobile && (
          <button onClick={toggleVideo} className="p3 flex items-center gap-2.5">
            <Pause /> {Playing ? 'Pause' : 'Play'} video
          </button>
        )}
        <Curve />
      </div>
      <Text
        field={props.fields.Description}
        className="block lg:hidden font-medium container text-center py-10 pb-0 text-dark-blue"
        tag="p"
      />
    </>
  );

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <h1>{props?.fields?.Headline?.value}</h1>
        <Text tag="h1" className="" field={props.fields.Headline} />
        <Text field={props.fields.Description} />
        {/* <div>{props.fields.HeroVideo}</div> */}
        <JssImage field={props.fields.Image} />
        {/* <div>{props.fields.HeroCta}</div> */}
      </div>
    </div>
  );
};

export const Secondary = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <h1>Secondary</h1>
        <h1>{props?.fields?.Headline?.value}</h1>
        <Text tag="h1" className="" field={props.fields.Headline} />
        <Text field={props.fields.Description} />
        {/* <div>{props.fields.HeroVideo}</div> */}
        <JssImage field={props.fields.Image} />
        {/* <div>{props.fields.HeroCta}</div> */}
      </div>
    </div>
  );
};

export const Download = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <h1>Download</h1>
        <h1>{props?.fields?.Headline?.value}</h1>
        <Text tag="h1" className="" field={props.fields.Headline} />
        <Text field={props.fields.Description} />
        {/* <div>{props.fields.HeroVideo}</div> */}
        <JssImage field={props.fields.Image} />
        {/* <div>{props.fields.HeroCta}</div> */}
      </div>
    </div>
  );
};
