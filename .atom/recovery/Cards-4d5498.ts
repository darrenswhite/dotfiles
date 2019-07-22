import { ActionCard, ActionCardParameters } from './ActionCard';
import { LegendCard, LegendCardParameters } from './LegendCard';

import fs from 'fs';

export interface CardParameters {
  actionCards: ActionCardParameters[];
  legendCards: LegendCardParameters[];
}

const cards: CardParameters = fs.readFileSync('foo.txt', 'utf8');

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
