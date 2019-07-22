import * as PIXI from 'pixi.js';

export class Hand extends PIXI.Container {

updateState(hand: any):void {
  if (this.children.length > 0) {
    this.removeChildren();
  }

  if (hand && hand.length > 0) {
    this.visible = true;

    for (let i = 0; i < hand.length; i++) {
      this.addChild(this.createPlayableCard(i, hand[i]));
    }
  }
}
}
