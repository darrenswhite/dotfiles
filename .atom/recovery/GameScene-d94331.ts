import { Scene } from '../Scene';
import { SceneManager } from '../SceneManager';
import { Button } from '../Button';
import { GameBoard } from './GameBoard';
import { Hand } from './Hand';
import { Room } from 'colyseus.js';
import * as PIXI from 'pixi.js';

export class GameScene extends Scene {
  room: Room<any>;

  leaveButton: Button;
  endTurnButton: Button;
  attackButton: Button;

  loadingText: PIXI.Text;
  currentTurnText: PIXI.Text;
  winnerText: PIXI.Text;

  hand: Hand;
  opponentBoard: GameBoard;
  board: GameBoard;

  constructor(sceneManager: SceneManager) {
    super(sceneManager);

    this.board = new GameBoard(this.sceneManager.app.spritesheet);
    this.addChild(this.board);

    this.opponentBoard = new GameBoard(this.sceneManager.app.spritesheet);
    this.addChild(this.opponentBoard);

    this.leaveButton = new Button(PIXI.Texture.WHITE, 'LEAVE', 150, 45, 24);
    this.leaveButton.on('pointertap', () => this.sceneManager.showLobby());
    this.addChild(this.leaveButton);

    this.loadingText = new PIXI.Text('Searching for Game...');
    this.addChild(this.loadingText);

    this.currentTurnText = new PIXI.Text('');
    this.addChild(this.currentTurnText);

    this.winnerText = new PIXI.Text('');
    this.addChild(this.winnerText);

    this.hand = new Hand(this.sceneManager.app.spritesheet);
    this.addChild(this.hand);

    this.endTurnButton = new Button(
      PIXI.Texture.WHITE,
      'END TURN',
      150,
      45,
      24
    );
    this.endTurnButton.on('pointertap', () => {
      this.room.send({
        command: 'endTurn',
      });
    });
    this.addChild(this.endTurnButton);

    this.attackButton = new Button(PIXI.Texture.WHITE, 'ATTACK', 150, 45, 24);
    this.attackButton.on('pointertap', () => {
      this.room.send({
        command: 'attack',
      });
    });
    this.addChild(this.attackButton);

    this.requestLayout();
  }

  updateState(state: any) {
    if (state.winner) {
      const winner =
        state.winner === this.room.sessionId ? 'You Win!' : 'You Lose!';
      this.winnerText.text = `${winner}`;
      this.winnerText.visible = true;
    }

    if (state.currentTurn) {
      const turn =
        state.currentTurn === this.room.sessionId
          ? 'Your Turn'
          : "Opponent's Turn";
      this.currentTurnText.text = `${turn}`;
      this.currentTurnText.visible = true;
      this.loadingText.visible = false;

      const player = state.players[this.room.sessionId];
      if (player) {
        this.board.visible = true;
        this.board.updateState(player);
        this.hand.visible = true;
        this.hand.updateState(player.hand, this.room);
      }

      const opponent = Object.entries(state.players).filter(
        ([key, _]) => key !== this.room.sessionId
      )[0][1];
      if (opponent) {
        this.opponentBoard.visible = true;
        this.opponentBoard.updateState(opponent);
      }
    } else {
      this.currentTurnText.visible = false;
      this.loadingText.visible = true;
      this.board.visible = false;
      this.hand.visible = false;
    }

    this.requestLayout();
  }

  onHide(): void {
    this.room.leave();
  }

  onShow(): void {
    this.loadingText.visible = true;
    this.currentTurnText.visible = false;
    this.winnerText.visible = false;
    this.hand.visible = false;
    this.board.visible = false;
    this.opponentBoard.visible = false;

    this.room = this.sceneManager.app.client.join<any>('game', {
      legendCard: Math.floor(Math.random() * 9),
      deck: JSON.stringify(
        Array.from({ length: 40 }, () => Math.floor(Math.random() * 3))
      ),
    });
    this.room.onStateChange.add((state: any) => this.updateState(state));
  }

  resize(screenWidth: number, screenHeight: number): void {
    const boardPadding = 50;
    const boardWidth = screenWidth - boardPadding * 2;
    const boardHeight = (screenHeight - boardPadding * 3) / 2;

    this.board.resize(boardWidth, boardHeight);
    this.board.x = boardPadding;
    this.board.y = screenHeight - boardPadding - this.board.height;

    this.opponentBoard.resize(boardWidth, boardHeight);
    this.opponentBoard.x = boardPadding;
    this.opponentBoard.y = boardPadding;

    this.leaveButton.x = 0;
    this.leaveButton.y = 0;

    this.loadingText.x = (screenWidth - this.loadingText.width) / 2;
    this.loadingText.y = (screenHeight - this.loadingText.height) / 2;

    this.currentTurnText.x = screenWidth - this.currentTurnText.width;
    this.currentTurnText.y = 0;

    this.winnerText.x = (screenWidth - this.winnerText.width) / 2;
    this.winnerText.y = (screenHeight - this.winnerText.height) / 2;

    this.hand.resize(screenWidth / 1.25, screenHeight);
    this.hand.x = (screenWidth - this.hand.width) / 2;
    this.hand.y = screenHeight - this.hand.height;

    this.endTurnButton.x = screenWidth - this.endTurnButton.width;
    this.endTurnButton.y = screenHeight - this.endTurnButton.height;

    this.attackButton.x = 0;
    this.attackButton.y = screenHeight - this.endTurnButton.height;
  }
}
