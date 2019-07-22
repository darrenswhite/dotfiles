import { ActionCard } from './ActionCard';
import { LegendCard } from './LegendCard';

import * as cards from './cards.json';

const actionCards = cards.actionCards.map(
  card => new ActionCard(card)
);

const legendCards: LegendCard[] = cards.legendCards.map(
  card => new LegendCard(card)
);

export function findActionCard(id: number): ActionCard | undefined {
  return actionCards.find((card: ActionCard) => card.id === id);
}

export function findLegendCard(id: number): LegendCard | undefined {
  return legendCards.find((card: LegendCard) => card.id === id);
}
