import * as PIXI from 'pixi.js';

export class Hand extends PIXI.Container {
  spritesheet: PIXI.Spritesheet;

  constructor(spritesheet: PIXI.Spritesheet) {
    super();
    this.spritesheet = spritesheet;
  }

  updateState(hand: any, room: any): void {
    if (this.children.length > 0) {
      this.removeChildren();
    }

    if (hand && hand.length > 0) {
      this.visible = true;

      for (let i = 0; i < hand.length; i++) {
        this.addChild(this.createPlayableCard(i, hand[i], room));
      }
    }
  }

  resize(screenWidth: number, _: number): void {
    const sprites = this.children.map(child => child as PIXI.Sprite);

    if (sprites.length > 0) {
      const margin = 10;

      if (this.width > screenWidth) {
        sprites.forEach(
          sprite => (sprite.scale.x = sprite.scale.y = 1)
        );

        const currentWidth =
          margin +
          sprites
            .map(child => child.width)
            .reduce((totalWidth, width) => (totalWidth += width + margin));
        const currentScale = screenWidth / currentWidth;

        sprites.forEach(
          sprite => (sprite.scale.x = sprite.scale.y = currentScale)
        );
      }

      let x = 0;

      sprites.forEach(sprite => {
        sprite.x = x;
        sprite.y = 0;

        x += sprite.width + margin;
      });
    }
  }

  createPlayableCard(i: number, id: string, room: any): PIXI.Sprite {
    const card = new PIXI.Sprite(
      this.spritesheet.textures[`action_card_${id}.png`]
    );

    card.buttonMode = true;
    card.interactive = true;
    card.x = i * 50;

    card.on('pointertap', () => {
      const opponents = Object.keys(room.state.players).filter(
        (id: string) => id !== room.sessionId
      );

      room.send({
        command: 'playCard',
        card: id,
        target: opponents[0],
      });
    });

    return card;
  }
}
