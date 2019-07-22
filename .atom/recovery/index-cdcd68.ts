import { createReadStream, createWriteStream } from 'fs';
import { join, resolve } from 'path';
const pimage = require('pureimage');

const assets = resolve('..', 'assets');

const cards = require(resolve(assets, 'cards.json'));

const actionCardTemplate = createReadStream(
  resolve(assets, 'template_action_card.png')
);

async function generateCards() {
  for (const card of cards.actionCards) {
    await generateCard(join(assets, 'action_card_'), card, actionCardTemplate);
  }
}

async function generateCard(prefix: string, card: any, template: any) {
  await pimage
    .decodePNGFromStream(template)
    .then(async (templateImage: any) => {
      const image = pimage.make(templateImage.width, templateImage.height);
      const ctx = image.getContext('2d');

      ctx.drawImage(templateImage);

      const path = join(assets, prefix + card.id + '.png');

      await pimage.encodePNGToStream(image, createWriteStream(path));
    });
}

generateCards();
