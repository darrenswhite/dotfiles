import { Card, CardParameters } from './Card';

export interface ActionCardParameters extends CardParameters {
  type: ActionCardType;
  adrenalineCost: number;
}

export class ActionCard extends Card {
  readonly type: ActionCardType;
  readonly adrenalineCost: number;

  constructor(params: ActionCardParameters) {
    super(params);
    this.type = params.type;
    this.adrenalineCost = params.adrenalineCost;
  }

  clone(): ActionCard {
    return new ActionCard(this);
  }

  func(arg: any): any {
    return arg;
  }
}

export enum ActionCardType {
  NORMAL,
  EQUIPMENT,
  RETALIATION,
}
