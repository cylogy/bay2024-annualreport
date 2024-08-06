export interface Item {
  title: string;
  text: string;
  year?: string;
  image?: string;
}

export interface TextContentTilesProps {
  title: string;
  subtitle?: string;
  variant: string;
  items: Item[];
}

/*type Cols3 = {
  title: "cols3";
  subtitle: string;
  video: string;
};

type Timeline = {
  variant: "timeline";
  image: string;
};

type Numbered = {
  variant: "numbered";
  image: string;
  cta: string;
};

type TextContent = {
  title: string;
  subtitle: string;
};*/

/*export type TextContentTilesProps = TextContent & (Cols3 | Timeline | Numbered);

export const isCols3 = (
  props: TextContentTilesProps
): props is Cols3 & TextContent => props.variant === "cols3";

export const isTimeline = (
  props: TextContentTilesProps
): props is Timeline & TextContent => props.variant === "timeline";

export const isNumbered = (
  props: TextContentTilesProps
): props is Numbered & TextContent => props.variant === "numbered";
*/
