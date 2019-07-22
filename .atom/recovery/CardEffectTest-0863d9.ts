import * as assert from 'assert';
import { CardEffect, EffectTarget, EffectId, LegendCard } from '../../src/card';
import { GameState, Player } from '../../src/game';
import { ArraySchema } from '@colyseus/schema';
import { instance, mock, verify, when } from 'ts-mockito';

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
    it('should add cards to hand from deck for DRAW_CARDS', () => {
      const cardEffect = new CardEffect({
        id: EffectId.DRAW_CARDS,
        value: 2,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);
      const playerMock = mock(Player);
      const player = instance(playerMock);

      when(stateMock.currentPlayer).thenReturn(player);

      cardEffect.apply(state);

      verify(playerMock.drawCards(2)).once();
    });
    it('should send top of deck to adrenaline stack for GAIN_ADRENALINE', () => {
      const cardEffect = new CardEffect({
        id: EffectId.GAIN_ADRENALINE,
        value: 3,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);
      const playerMock = mock(Player);
      const player = instance(playerMock);

      when(stateMock.currentPlayer).thenReturn(player);

      cardEffect.apply(state);

      verify(playerMock.sendTopOfDeckToAdrenalineStack(3)).once();
    });
    it('should add attack to the legend card for ADD_ATTACK', () => {
      const cardEffect = new CardEffect({
        id: EffectId.ADD_ATTACK,
        value: 1,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);
      const playerMock = mock(Player);
      const player = instance(playerMock);
      const legendCard = instance(mock(LegendCard));

      when(playerMock.legendCard).thenReturn(legendCard);
      when(stateMock.currentPlayer).thenReturn(player);

      legendCard.currentAttack = 1;

      cardEffect.apply(state);

      assert.strictEqual(legendCard.currentAttack, 2);
    });
    it('should do nothing for no effect', () => {
      const cardEffect = new CardEffect({
        id: undefined,
        value: 1,
        target: EffectTarget.SELF,
      });
      const stateMock = mock(GameState);
      const state = instance(stateMock);

      cardEffect.apply(state);

      verify(state).never();
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
