import * as assert from 'assert';
import {
  ActionCard,
  ActionCardType,
  CardFamily,
  CardRarity,
  CardEdition,
} from '../../src/card';

const actionCardParams = {
  id: 123,
  metadata: {
    name: 'name',
    description: 'description',
    family: CardFamily.HUMAN,
    rarity: CardRarity.PEARL,
    edition: CardEdition.FIRST,
  },
  type: ActionCardType.NORMAL,
  adrenalineCost: 1,
  effects: [{ id: 1, value: 5 }],
};

describe('ActionCard', () => {
  describe('#constructor()', () => {
    it('should create a new instance', () => {
      const actionCard = new ActionCard(actionCardParams);

      assert.ok(actionCard);
      assert.strictEqual(actionCard.id, actionCardParams.id);
      assert.strictEqual(actionCard.metadata.name, actionCardParams.metadata.name);
      assert.strictEqual(
        actionCard.metadata.description,
        actionCardParams.metadata.description
      );
      assert.strictEqual(actionCard.metadata.family, actionCardParams.metadata.family);
      assert.strictEqual(actionCard.metadata.rarity, actionCardParams.metadata.rarity);
      assert.strictEqual(actionCard.metadata.edition, actionCardParams.metadata.edition);
      assert.strictEqual(actionCard.type, actionCardParams.type);
      assert.strictEqual(actionCard.adrenalineCost, actionCardParams.adrenalineCost);
      assert.strictEqual(actionCard.effects[0].id, actionCardParams.effects[0].id);
      assert.strictEqual(actionCard.effects[0].value, actionCardParams.effects[0].value);
    });
  });
  describe('#clone()', () => {
    it('should copy an existing instance', () => {
      const actionCardParams = {
        id: 123,
        metadata: {
          name: 'name',
          description: 'description',
          family: CardFamily.HUMAN,
          rarity: CardRarity.PEARL,
          edition: CardEdition.FIRST,
        },
        type: ActionCardType.NORMAL,
        adrenalineCost: 1,
        effects: [{ id: 1, value: 5 }],
      };
      const actionCard = new ActionCard(actionCardParams);

      const clone = actionCard.clone();

      assert.ok(clone);
      assert.strictEqual(clone.id, actionCard.id);
      assert.deepStrictEqual(clone.metadata, actionCard.metadata);
      assert.strictEqual(clone.type, actionCard.type);
      assert.strictEqual(clone.adrenalineCost, actionCard.adrenalineCost);
      assert.deepStrictEqual(clone.effects, actionCard.effects);
    });
  });
});
