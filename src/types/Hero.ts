type HeroMain = {
  variant: "main";
  video: string;
};

type HeroSecondary = {
  variant: "secondary";
};

type HeroDownload = {
  variant: "download";
  cta: string;
};

type HeroContent = {
  headline: string;
  description: string;
  image: string;
};

export type HeroProps = HeroContent & (HeroMain | HeroSecondary | HeroDownload);

export const isHeroMain = (props: HeroProps): props is HeroMain & HeroContent =>
  props.variant === "main";

export const isHeroSecondary = (
  props: HeroProps
): props is HeroSecondary & HeroContent => props.variant === "secondary";

export const isHeroDownload = (
  props: HeroProps
): props is HeroDownload & HeroContent => props.variant === "download";
