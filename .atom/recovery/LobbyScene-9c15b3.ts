import { Scene } from '../Scene';
import { SceneManager } from '../SceneManager';
import { Button } from '../Button';
import { Room } from 'colyseus.js';
import * as PIXI from 'pixi.js';

export class LobbyScene extends Scene {
  onLoad: Function;
  room?: Room;
  menu: PIXI.Container;
  playButton: Button;
  decksButton: Button;
  loader: PIXI.Text;

  constructor(sceneManager: SceneManager, onLoad: Function) {
    super(sceneManager);
    this.onLoad = onLoad;

    this.loader = new PIXI.Text('Loading...');
    this.addChild(this.loader);

    this.menu = new PIXI.Container();

    this.playButton = new Button(PIXI.Texture.WHITE, 'PLAY', 300, 90, 48);
    this.playButton.on('pointertap', () => this.sceneManager.showGame());
    this.menu.addChild(this.playButton);

    this.decksButton = new Button(PIXI.Texture.WHITE, 'DECKS', 300, 90, 48);
    this.decksButton.on('pointertap', () => this.sceneManager.showDeck());
    this.menu.addChild(this.decksButton);

    this.requestLayout();
  }

  isLoaded(): boolean {
    const spritesheet = this.sceneManager.app.spritesheet;
    return spritesheet && spritesheet.textures;
  }

  triggerProgress(): void {
    if (this.isLoaded()) {
      this.onLoad();
      this.removeLoader();
      this.addMenu();
      this.requestLayout();
    }
  }

  removeLoader(): void {
    this.loader.destroy();
    this.removeChild(this.loader);
  }

  addMenu(): void {
    this.addChild(this.menu);
  }

  onHide(next: Scene): void {
    if (next !== this.sceneManager.deckScene && this.room) {
      this.room.leave();
      this.room = undefined;
    }
  }

  onShow(): void {
    if (!this.room) {
      this.room = this.sceneManager.app.client.join('lobby', {});
    }
  }

  resize(screenWidth: number, screenHeight: number): void {
    if (this.loader) {
      this.loader.x = (screenWidth - this.loader.width) / 2;
      this.loader.y = (screenHeight - this.loader.height) / 2;
    } else if (this.menu) {
      const buttonWidth = screenWidth / 4;
      const buttonHeight = buttonWidth / 3;
      const buttonFontSize = buttonHeight;

      this.playButton.resize(buttonWidth, buttonHeight, buttonFontSize);
      this.playButton.x = 0;
      this.playButton.y = 0;

      this.decksButton.buttonSprite.width = buttonWidth;
      this.decksButton.buttonSprite.height = buttonHeight;
      this.decksButton.x = 0;
      this.decksButton.y = buttonHeight * 2;

      this.menu.x = (screenWidth - this.menu.width) / 2;
      this.menu.y = (screenHeight - this.menu.height) / 2;
    }
  }
}
