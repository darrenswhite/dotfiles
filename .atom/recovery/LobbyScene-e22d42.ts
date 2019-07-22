import { Scene } from '../Scene';
import { SceneManager } from '../SceneManager';
import { Button } from '../Button';
import { Room } from 'colyseus.js';
import * as PIXI from 'pixi.js';

const BUTTON_GAP = 50;

export class LobbyScene extends Scene {
  onLoad: Function;
  room?: Room;
  menu: PIXI.Container;
  loader?: PIXI.Text;

  constructor(sceneManager: SceneManager, onLoad: Function) {
    super(sceneManager);
    this.onLoad = onLoad;
    this.loader = new PIXI.Text('Loading...');
    this.addChild(this.loader);
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
    if (this.loader) {
      this.loader.destroy();
      this.removeChild(this.loader);
      this.loader = undefined;
    }
  }

  addMenu(): void {
    this.menu = new PIXI.Container();

    const playButton = new Button(PIXI.Texture.WHITE, 'PLAY', 300, 90, 48);
    playButton.on('pointertap', () => this.sceneManager.showGame());
    playButton.x = 0;
    playButton.y = 0;
    this.menu.addChild(playButton);

    const decksButton = new Button(PIXI.Texture.WHITE, 'DECKS', 300, 90, 48);
    decksButton.on('pointertap', () => this.sceneManager.showDeck());
    decksButton.x = 0;
    decksButton.y = playButton.height + BUTTON_GAP;
    this.menu.addChild(decksButton);

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
      this.menu.x = (screenWidth - this.menu.width) / 2;
      this.menu.y = (screenHeight - this.menu.height) / 2;
    }
  }
}
