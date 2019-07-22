import * as fs from 'fs';
const pimage = require('pureimage');

const cards = require('../../../assets/cards.json');

const actionCardTemplate = fs.createReadStream('../../../assets/template_action_card.png');

for (const card of cards.actionCards) {
  generateImage(card, actionCardTemplate);
}

function generateImage(card: any, template: any): void {
  const image = pimage.make(315, 440);

}
