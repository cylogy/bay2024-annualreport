export type GoalCardType = {
  image: string
  title: string
  objectives: string
  cta: string
}

export type GraphicContentTilesProps = {
  headline: string;
  description: string;
  cards: GoalCardType[]
}