import * as assert from 'assert';
import { CardEffect, EffectTarget } from '../../src/card';
import { GameState } from '../../src/game';
import { mock } from 'ts-mockito';

describe('ActionCard', () => {
  describe('#constructor()', () => {
    it('should create a new instance', () => {
      const params = {
        id: 1,
        value: 2,
        target: 3,
      };
      const cardEffect = new CardEffect(params);

      assert.ok(cardEffect);
      assert.strictEqual(cardEffect.id, params.id);
      assert.strictEqual(cardEffect.value, params.value);
      assert.strictEqual(cardEffect.target, cardEffect.target);
    });
  });
  describe('#findTarget()', () => {
    it('should return the current player', () => {
      const cardEffect = new CardEffect({
        id: 0,
        value: 1,
        target: EffectTarget.SELF,
      });
      const state = mock(GameState);

      state.currentTurn = 'playerA';

      const target = cardEffect.findTarget(state);

      assert.ok(target);
      assert.strictEqual(target!.id, 'playerA');
    });
  });
});
