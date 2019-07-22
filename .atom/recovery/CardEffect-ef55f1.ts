import { GameState, Player } from '../game';

export interface CardEffectParameters {
  id: EffectId;
  value: number;
  target?: EffectTarget;
}

export class CardEffect {
  readonly id: EffectId;
  readonly value: number;
  readonly target?: EffectTarget;

  constructor(params: CardEffectParameters) {
    this.id = params.id;
    this.value = params.value;
    this.target = params.target;
  }

  apply(state: GameState) {
    const target = this.findTarget(state);

    switch (this.id) {
      case EffectId.ADD_HEALTH:
        if (target) {
          target.legendCard.currentHealth += this.value;
        }
        break;
      case EffectId.DRAW_CARD:
        if (target) {
          target.drawCards(this.value);
        }
        break;
      case EffectId.GAIN_ADRENALINE:
        if (target) {
          for (let i = 0; i < this.value; i++) {
            target.sendTopOfDeckToAdrenalineStack();
          }
        }
        break;
      case EffectId.ADD_ATTACK:
        if (target) {
          target.legendCard.currentAttack += this.value;
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

export enum EffectId {
  ADD_HEALTH,
  DRAW_CARD,
  GAIN_ADRENALINE,
  ADD_ATTACK,
}
