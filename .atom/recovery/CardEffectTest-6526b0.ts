import * as assert from 'assert';
import { CardEffect, EffectTarget } from '../../src/card';
import { GameState, Player } from '../../src/game';
import { instance, mock, when } from 'ts-mockito';

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
    it('should return undefined for NONE', () => {
      const cardEffect = new CardEffect({
        id: 0,
        value: 1,
        target: EffectTarget.NONE,
      });
      const state = instance(mock(GameState));

      const target = cardEffect.findTarget(state);

      assert.strictEqual(target, undefined);
    });
    it('should return the current player for SELF', () => {
      const cardEffect = new CardEffect({
        id: 0,
        value: 1,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const currentPlayer = instance(mock(Player));

      when(stateMock.currentPlayer).thenReturn(currentPlayer);

      const state = instance(stateMock);

      const target = cardEffect.findTarget(state);

      assert.ok(target);
      assert.deepStrictEqual(target, currentPlayer);
    });
    it('should return the current player for SELF', () => {
      const cardEffect = new CardEffect({
        id: 0,
        value: 1,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const currentPlayer = instance(mock(Player));

      when(stateMock.currentPlayer).thenReturn(currentPlayer);

      const state = instance(stateMock);

      const target = cardEffect.findTarget(state);

      assert.ok(target);
      assert.deepStrictEqual(target, currentPlayer);
    });
  });
});
