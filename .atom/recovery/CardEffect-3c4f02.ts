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

  apply(state: GameState) {
    const target = this.findTarget(state);

    switch (this.id) {
      case ADD_HEALTH:
        if (target) {
          target.legendCard.currentHealth += this.value;
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

  findTarget(state: GameState): Player | undefined {
    let target;

    switch (this.target) {
      case EffectTarget.NONE:
        break;
      case EffectTarget.SELF:
        // TODO get effect initiator
        target = state.currentPlayer;
        break;
      case EffectTarget.OPPONENT:
        // TODO get opponents of effect initiator
        if (state.currentTurn) {
          const opponents = state.getOpponents(state.currentTurn);

          if (opponents.size === 1) {
            target = opponents.values().next().value;
          } else {
            // TODO choose opponent
            // TODO target multiple opponents
          }
        }
        break;
      default:
        break;
    }

    return target;
  }
}

export enum EffectTarget {
  NONE,
  SELF,
  OPPONENT,
}

const ADD_HEALTH = 0;
const DRAW_CARD = 1;
const GAIN_ADRENALINE = 2;
