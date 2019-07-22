import * as assert from 'assert';
import {
  LegendCard,
  CardMetadata,
  CardFamily,
  CardRarity,
  CardEdition,
} from '../../src/card';
import { Player } from '../../src/game';
import { ArraySchema } from '@colyseus/schema';

describe('Player', () => {
  describe('constructor', () => {
    it('creates a player', () => {
      const metadata = new CardMetadata(
        'name',
        'description',
        CardFamily.HUMAN,
        CardRarity.PEARL,
        CardEdition.FIRST
      );
      const legendCard = new LegendCard(0, metadata, 0, 0, 0, []);
      const deck = new ArraySchema() < number > 0;

      const player = new Player(legendCard, deck);

      assert.ok(player);
      assert.strictEqual(player.legendCard, legendCard);
      assert.deepStrictEqual(player.deck, deck);
    });
  });
});
