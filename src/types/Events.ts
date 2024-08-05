// types/TextContentTilesProps.ts

export interface item {
  title: string;
  date: string;
  location: string;
  text: string;
}

export interface EventsProps {
  title: string;
  items: item[];
}
