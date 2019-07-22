import { Cards, LegendCard } from '../card';
import { GameRoomMessage } from './GameRoom';
import { Player } from './Player';
import { Client } from 'colyseus';
import { Schema, MapSchema, ArraySchema, type } from '@colyseus/schema';

const COMMAND_ATTACK = 'attack';
const COMMAND_PLAY_CARD = 'playCard';
const COMMAND_END_TURN = 'endTurn';

export class GameState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  @type('number')
  requiredPlayers: number;

  @type('string')
  currentTurn?: string;

  @type('string')
  winner?: string;

  constructor(requiredPlayers: number) {
    super();
    this.requiredPlayers = requiredPlayers;
  }

  addPlayer(
    sessionId: string,
    legendCard: LegendCard,
    deck: ArraySchema<number>
  ): Player {
    const player = new Player(legendCard, deck);
    this.players[sessionId] = player;
    return player;
  }

  assignCurrentTurn(): void {
    const keys = Object.keys(this.players);
    this.currentTurn = keys[Math.floor(Math.random() * keys.length)];
  }

  drawInitialHand(): void {
    Object.values(this.players).forEach((player: Player) =>
      player.drawInitialHand()
    );
  }

  hasRequiredPlayers(): boolean {
    return Object.keys(this.players).length >= this.requiredPlayers;
  }

  doAction(client: Client, data: GameRoomMessage): void {
    const playerId = client.sessionId;

    if (!this.winner && this.currentTurn === playerId) {
      const player = this.players[playerId];
      const opponents = Object.entries(this.players).filter(
        ([id, _]) => id !== playerId
      );

      if (player.isAlive() && !player.forceEndTurn) {
        const command = data.command;

        switch (command) {
          case COMMAND_ATTACK:
            // TODO target opponent
            this.doAttack(player, opponents[0][1]);
            break;
          case COMMAND_PLAY_CARD:
            if (data.card !== undefined) {
              this.doPlayCard(player, data.card, data.target);
            }
            break;
          case COMMAND_END_TURN:
            this.doEndTurn();
            break;
          default:
            break;
        }
      }

      if (player.forceEndTurn) {
        this.doEndTurn();
      }
    }
  }

  doAttack(player: Player, opponent: Player): void {
    opponent.legendCard.currentHealth -= player.legendCard.currentAttack;

    for (let i = 0; i < player.legendCard.baseAdrenaline; i++) {
      player.sendTopOfDeckToVoid();
    }

    player.forceEndTurn = true;
  }

  doPlayCard(player: Player, id: number, target?: string): void {
    const card = Cards.findActionCard(id);

    if (card) {
      player.playCard(card, this, target);
    }
  }

  doEndTurn(): void {
    let currentPlayer = this.players[this.currentTurn!];
    currentPlayer.endTurn();

    // TODO track order of player turns
    this.currentTurn = Object.keys(this.players).find(
      (id: string) => id !== this.currentTurn
    );

    currentPlayer = this.players[this.currentTurn!];
    currentPlayer.startTurn();
  }

  checkWinner(): void {
    const alivePlayers = Object.entries(this.players).filter(([_, player]) =>
      player.isAlive()
    );

    if (alivePlayers.length === 1) {
      this.winner = alivePlayers[0][0];
    }
  }
}
