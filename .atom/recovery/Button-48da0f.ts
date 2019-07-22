import * as PIXI from 'pixi.js';

export class Button extends PIXI.Container {
buttonSprite: PIXI.Sprite;
buttonText: PIXI.Text;

  constructor(
    texture: PIXI.Texture,
    text: string,
    width: number,
    height: number,
    fontSize: number
  ) {
    super();

    this.interactive = true;

    this.buttonSprite = new PIXI.Sprite(texture);
    this.buttonSprite.width = width;
    this.buttonSprite.height = height;
    this.buttonSprite.buttonMode = true;
    this.buttonSprite.interactive = true;
    this.buttonSprite.tint = 0xdd0000;
    this.buttonSprite.on('pointerover', () => {
      this.buttonSprite.tint = 0xff0000;
    });
    this.buttonSprite.on('pointerout', () => {
      this.buttonSprite.tint = 0xdd0000;
    });
    this.buttonSprite.on('pointerdown', () => {
      this.buttonSprite.tint = 0xbb0000;
    });
    this.addChild(this.buttonSprite);

    this.buttonText = new PIXI.Text(text, {
      fontFamily: 'Arial',
      fontSize,
      fill: 0xffffff,
      align: 'center',
    });
    this.buttonText.x = (this.buttonSprite.width - this.buttonText.width) / 2;
    this.buttonText.y = (this.buttonSprite.height - this.buttonText.height) / 2;
    this.addChild(this.buttonText);
  }
}
