import * as assert from 'assert';
import { CardEffect, EffectTarget, EffectId, LegendCard } from '../../src/card';
import { GameState, Player } from '../../src/game';
import { ArraySchema } from '@colyseus/schema';
import { instance, mock, when } from 'ts-mockito';

describe('CardEffect', () => {
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
  describe('#apply()', () => {
    it('should add health to the legend card for ADD_HEALTH', () => {
      const cardEffect = new CardEffect({
        id: EffectId.ADD_HEALTH,
        value: 5,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);
      const playerMock = mock(Player);
      const player = instance(playerMock);
      const legendCard = instance(mock(LegendCard));

      when(playerMock.legendCard).thenReturn(legendCard);
      when(stateMock.currentPlayer).thenReturn(player);

      legendCard.currentHealth = 20;

      cardEffect.apply(state);

      assert.strictEqual(legendCard.currentHealth, 25);
    });
    it('should add cards to hand from deck for DRAW_CARD', () => {
      const cardEffect = new CardEffect({
        id: EffectId.DRAW_CARD,
        value: 2,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);
      const playerMock = mock(Player);
      const player = instance(playerMock);
      const hand = new ArraySchema<number>(1, 2, 3);
      const deck = new ArraySchema<number>(4, 5);

      when(playerMock.hand).thenReturn(hand);
      when(playerMock.deck).thenReturn(deck);
      when(stateMock.currentPlayer).thenReturn(player);

      cardEffect.apply(state);

      playerMock.ver
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
      const state = instance(stateMock);
      const currentPlayer = instance(mock(Player));

      when(stateMock.currentPlayer).thenReturn(currentPlayer);

      const target = cardEffect.findTarget(state);

      assert.ok(target);
      assert.deepStrictEqual(target, currentPlayer);
    });
    it('should return the opponent for OPPONENT for a single opponent', () => {
      const cardEffect = new CardEffect({
        id: 0,
        value: 1,
        target: EffectTarget.OPPONENT,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);
      const currentPlayer = 'Bill';
      const opponent = instance(mock(Player));
      const opponents = new Map([['Bob', opponent]]);

      when(stateMock.currentTurn).thenReturn(currentPlayer);
      when(stateMock.getOpponents(currentPlayer)).thenReturn(opponents);

      const target = cardEffect.findTarget(state);

      assert.ok(target);
      assert.deepStrictEqual(target, opponent);
    });
    it('should return undefined for OPPONENT for multiple opponents', () => {
      const cardEffect = new CardEffect({
        id: 0,
        value: 1,
        target: EffectTarget.OPPONENT,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);
      const currentPlayer = 'Bill';
      const opponent1 = instance(mock(Player));
      const opponent2 = instance(mock(Player));
      const opponents = new Map([['Bob', opponent1], ['Baz', opponent2]]);

      when(stateMock.currentTurn).thenReturn(currentPlayer);
      when(stateMock.getOpponents(currentPlayer)).thenReturn(opponents);

      const target = cardEffect.findTarget(state);

      assert.strictEqual(target, undefined);
    });
    it('should return undefined for no target', () => {
      const cardEffect = new CardEffect({
        id: 0,
        value: 1,
      });
      const state = instance(mock(GameState));

      const target = cardEffect.findTarget(state);

      assert.strictEqual(target, undefined);
    });
  });
});
