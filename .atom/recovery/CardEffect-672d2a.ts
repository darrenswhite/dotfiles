import { GameState, Player } from '../game';

export interface CardEffectParameters {
  id: number;
  value: number;
  target?: EffectTarget;
}

export class CardEffect {
  readonly id: number;
  readonly value: number;
  readonly target?: EffectTarget;
  readonly targetValue?: EffectTarget;

  constructor(params: CardEffectParameters) {
    this.id = params.id;
    this.value = params.value;
    this.target = params.target;
  }

  apply(state: GameState, targeting?: string) {
    const target = this.findTarget(state, targeting);

    switch (this.id) {
      case DEAL_DAMAGE:
        if (target) {
          target.legendCard.currentHealth -= this.value;
        }
        break;
      case DRAW_CARD:
        if (target) {
          target.drawCards(this.value);
        }
        break;
      case GAIN_ADRENALINE:
        if (target) {
          for (let i = 0; i < this.value; i++) {
            target.sendTopOfDeckToAdrenalineStack();
          }
        }
        break;
      default:
        break;
    }
  }

  findTarget(state: GameState, targeting?: string): Player | undefined {
    let foundTarget;

    if (targeting) {
      switch (this.target) {
        case EffectTarget.NONE:
          break;
        case EffectTarget.ONE_PLAYER:
          foundTarget = state.players[targeting];
          break;
        default:
          break;
      }
    }

    return foundTarget;
  }
}

export enum EffectTarget {
  NONE,
  PLAYER,
  OPPONENT,
  SELF,
}

const DEAL_DAMAGE = 0;
const DRAW_CARD = 1;
const GAIN_ADRENALINE = 2;
