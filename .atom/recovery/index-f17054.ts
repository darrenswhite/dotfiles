import { createReadStream, createWriteStream } from 'fs';
import { join, resolve } from 'path';
import {make,decodePNGFromStream,encodePNGToStream} from 'pureimage';

const assets = resolve('..', 'assets');

const cards = require(resolve(assets, 'cards.json'));

const actionCardTemplate = createReadStream(
  resolve(assets, 'template_action_card.png')
);

function generateCards() {
  for (const card of cards.actionCards) {
    generateCard(join(assets, 'action_card_'), card, actionCardTemplate);
  }
}

function generateCard(prefix: string, card: any, template: any) {
  decodePNGFromStream(template)
    .then(async (templateImage: any) => {
      const image = make(templateImage.width, templateImage.height);
      const ctx = image.getContext('2d');

      ctx.drawImage(templateImage);

      const path = join(assets, prefix + card.id + '.png');
      // const stream = createWriteStream(path);

      // stream.once('open', () => encodePNGToStream(image, stream)  .catch((e: any) => console.log(e)));
    })
    .catch((e: any) => console.log('oops'));
}

generateCards();
