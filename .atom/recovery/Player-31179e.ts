import { ActionCard, LegendCard } from '../card';
import { GameState } from './GameState';
import { Schema, ArraySchema, type } from '@colyseus/schema';
import _ from 'lodash';

const MAXIMUM_HAND_SIZE = 6;
const STARTING_HAND_SIZE = 5;

export class Player extends Schema {
  readonly id: string;

  @type(LegendCard)
  readonly legendCard: LegendCard;

  @type(['number'])
  deck: ArraySchema<number>;

  @type(['number'])
  hand = new ArraySchema<number>();

  @type(['number'])
  field = new ArraySchema<number>();

  @type(['number'])
  adrenalineStack = new ArraySchema<number>();

  @type(['number'])
  void = new ArraySchema<number>();

  forceEndTurn = false;

  constructor(id: string, legendCard: LegendCard, deck: ArraySchema<number>) {
    super();
    this.id = id;
    this.legendCard = legendCard;
    this.deck = deck;
    this.shuffleDeck();
  }

  startTurn(): void {
    this.drawCards(1);
  }

  endTurn(): void {
    if (this.hand.length > MAXIMUM_HAND_SIZE) {
      // TODO send cards from hand to void
    }

    this.forceEndTurn = false;
  }

  drawCards(amount = 1): void {
    for (let i = 0; i < amount && !this.forceEndTurn; i++) {
      if (this.deck.length === 0) {
        this.resetDeck();
      } else {
        this.hand.push(this.deck.pop()!);
      }
    }
  }

  drawInitialHand(): void {
    this.drawCards(STARTING_HAND_SIZE);
  }

  isAlive(): boolean {
    return this.legendCard.currentHealth > 0;
  }

  resetDeck(): void {
    this.deck.push(
      ...this.adrenalineStack.splice(0, this.adrenalineStack.length)
    );
    this.deck.push(...this.void.splice(0, this.void.length));
    this.shuffleDeck();
    this.forceEndTurn = true;
  }

  playCard(card: ActionCard, state: GameState): void {
    if (!this.forceEndTurn && this.canPlayCard(card)) {
      const index = this.hand.indexOf(card.id);
      if (index > -1) {
        this.hand.splice(index, 1);

        for (let i = 0; i < card.adrenalineCost; i++) {
          this.void.push(this.adrenalineStack.pop()!);
        }

        card.effects.forEach(effect => effect.apply(state));

        this.adrenalineStack.push(card.id);
      }
    }
  }

  canPlayCard(card: ActionCard): boolean {
    return this.adrenalineStack.length >= card.adrenalineCost;
  }

  shuffleDeck(): void {
    const cards = this.deck.splice(0, this.deck.length);
    this.deck.push(..._.shuffle(cards));
  }

  sendTopOfDeckToAdrenalineStack(amount = 1): void {
    for (let i = 0; i < amount && !this.forceEndTurn; i++) {
      if (this.deck.length === 0) {
        this.resetDeck();
      } else {
        this.adrenalineStack.push(this.deck.pop()!);
      }
    }
  }

  sendTopOfDeckToVoid(amount = 1): void {
    for (let i = 0; i < amount && !this.forceEndTurn; i++) {
      if (this.deck.length === 0) {
        this.resetDeck();
      } else {
        this.void.push(this.deck.pop()!);
      }
    }
  }
}
oid.push(this.deck.pop()!);
      }
    }
  }
}
